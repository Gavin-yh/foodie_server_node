const express = require('express');
const router = express.Router();

const https = require('https');
const qs = require('querystring');



router.get('/AI/match/face', (req, res, next) => {
    let result = '';
    const param = qs.stringify({
        'grant_type': 'client_credentials',
        'client_id': 'dXWWPz8OG5aW8HtubLR6E5dl',
        'client_secret': '0RmBZlQSwlZMzse4ptEY8770o3tWrB8F'
    });
    https.get({
            hostname: 'aip.baidubce.com',
            path: '/oauth/2.0/token?' + param,
            agent: false
        },
        (AIres) => {
            // 在标准输出中查看运行结果
            AIres.on('data', (d) => {
                result += d;
            });
            AIres.on("end", () => {
                res.json({
                    msg: JSON.parse(result).access_token
                })
            })
        }
    );
})

module.exports = router