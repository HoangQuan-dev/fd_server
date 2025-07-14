const express = require('express');
const router = express.Router();
const querystring = require('qs');
const crypto = require("crypto");     
const moment = require('moment');
const Order = require('../../models/order.model');

function sortObject(obj) {
	let sorted = {};
	let str = [];
	let key;
	for (key in obj){
		if (obj.hasOwnProperty(key)) {
		str.push(encodeURIComponent(key));
		}
	}
	str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}

const tmnCode = process.env.VNPAY_TMN_CODE;
const secretKey = process.env.VNPAY_HASH_SECRET;
const returnUrl = process.env.VNPAY_RETURN_URL;
const vnpBaseUrl = process.env.VNPAY_URL;

router.post('/create_payment_url', async function (req, res, next) {
    var ipAddr = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    var date = new Date();

    var createDate = moment(date).format('YYYYMMDDHHmmss');
    var orderId = moment(date).format('HHmmss');
    var amount = req.body.amount;
    var bankCode = req.body.bankCode;
    
    var orderInfo = req.body.orderDescription;
    var orderType = req.body.orderType;
    var locale = req.body.language;
    if(locale === null || locale === ''){
        locale = 'vn';
    }
    var currCode = 'VND';
    var vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    // vnp_Params['vnp_Merchant'] = ''
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = orderInfo;
    vnp_Params['vnp_OrderType'] = orderType;
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    if(bankCode !== null && bankCode !== ''){
        vnp_Params['vnp_BankCode'] = bankCode;
    }

    vnp_Params = sortObject(vnp_Params);

    let signData = querystring.stringify(vnp_Params, { encode: false });    
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer.from(signData, 'utf-8')).digest("hex"); 
    vnp_Params['vnp_SecureHash'] = signed;
    let vnpUrl = vnpBaseUrl;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
    console.log('vnpUrl', vnpUrl);

    const order = new Order({
        orderId: orderId,
        amount: amount,
        orderInfo: orderInfo,
        createDate: createDate,
        bankCode: bankCode
    });

    try {
        await order.save();
        console.log('Order saved successfully');
    } catch (error) {
        console.error('Error saving order: ', error);
        res.status(500).send('Error saving order');
    }

    res.send(vnpUrl);
});
 
router.get('/vnpay_return', function (req, res, next) {
    var vnp_Params = req.query;
    console.log('vnp_Params', vnp_Params);

    var secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);

    var signData = querystring.stringify(vnp_Params, { encode: false });
    var hmac = crypto.createHmac("sha512", secretKey);
    var signed = hmac.update(new Buffer.from(signData, 'utf-8')).digest("hex");     

    if(secureHash === signed){
        //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua

        res.send(`success, code: ${vnp_Params['vnp_ResponseCode']}`);
    } else{
        res.send('success, code: 97');
    }
});

router.get('/payment-success', (req, res) => {
    const data = {
      title: 'Thanh toán thành công',
      message: 'Đơn hàng của bạn đã được thanh toán thành công. Hãy quay về ứng dụng và tiếp tục mua sắm nhé!'
    };
  
    res.render('payment-success', data);
});

module.exports = router;