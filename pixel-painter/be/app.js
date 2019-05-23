const express = require('express');
const SocketIO = require('socket.io');
const Jimp = require('jimp');
const fs = require('fs');
const app = express();
const port = 3005;
const server = app.listen(port, () => {
    console.log('sever listening on port',port);
})
const path = require('path');
const io = SocketIO(server);

app.use(express.static(path.join (__dirname, '../fe/build')));
async function main() {
    const pixelData = await Jimp.read('./pixelData.png');
    let onlineCount = 0;
    io.on('connection', async (ws) => {
        onlineCount++;
        io.emit('online-count',onlineCount);
        var pngBuffer = await pixelData.getBufferAsync(Jimp.MIME_PNG);
        var lastDrawTime = Date.now();
        
        ws.emit('initial-pixel-data', pngBuffer);
        // setTimeout(() => {
        //     SocketIO.emit('foo bar', {
        //         pngBuffer,
        //         foo: 1,
        //         bar :'2222',
        //         buffer: Buffer.alloc(100).fill(0xff),
        //     })
        // },5000);
        ws.on('draw-dot', async ({row,col,color}) => {
            var now = Date.now();
            if(now -lastDrawTime < 3000){
                return
            }
            lastDrawTime = now;
            var hexColor = Jimp.cssColorToHex(color);
            pixelData.setPixelColor(hexColor,col,row);
            // ws.broadcast.emit('updata-dot',{row,col,color});
            io.emit('updata-dot',{row,col,color});

            var buf = await pixelData.getBufferAsync(Jimp.MIME_PNG);
            fs.writeFile('/pixelData.png', buf, (err) => {
                if(err){
                    console.log(err);
                }else{
                    console.log('save pixel data success!')
                }
            })
        })

        ws.on('disconnect', () => {
            onlineCount--;
            io.emit('online-count',onlineCount);

            //clients = clients.filter(it => it != socket);
            console.log('someone leave')
        })
        
        console.log('on connection');

    })
}

main();
