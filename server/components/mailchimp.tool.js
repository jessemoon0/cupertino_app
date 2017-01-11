'use strict';

/**
 * Created by marcochavezf on 4/30/15.
 */

var mandrill = require('mandrill-api/mandrill');

var mandrill_client = new mandrill.Mandrill('z7wLLXuctFVor1bUGahbEA');

var message = {
    "html": "<p>Example HTML content</p>",
    "text": "Example text content",
    "subject": "example subject",
    "from_email": "daniel_ruelas@lamarr.com.mx",
    "from_name": "Example Name",
    "to": [{
            "email": "sango265@hotmail.com",
            "name": "Recipient Name",
            "type": "to"
        }],
    "headers": {
        "Reply-To": "daniel_ruelas@lamarr.com.mx"
    },
    "important": false,
    "track_opens": null,
    "track_clicks": null,
    "auto_text": null,
    "auto_html": null,
    "inline_css": null,
    "url_strip_qs": null,
    "preserve_recipients": null,
    "view_content_link": null,
    "bcc_address": "message.bcc_address@example.com",
    "tracking_domain": null,
    "signing_domain": null,
    "return_path_domain": null,
    "merge": true,
    "merge_language": "mailchimp",
    "global_merge_vars": [{
            "name": "merge1",
            "content": "merge1 content"
        }],
    "merge_vars": [{
            "rcpt": "recipient.email@example.com",
            "vars": [{
                    "name": "merge2",
                    "content": "merge2 content"
                }]
        }],
    "tags": [
        "password-resets"
    ],
    "subaccount": "customer-123",
    "google_analytics_domains": [
        "lamarr.com.mx"
    ],
    "google_analytics_campaign": "message.from_email@example.com",
    "metadata": {
        "website": "www.lamarr.com.mx"
    },
    "recipient_metadata": [{
            "rcpt": "recipient.email@example.com",
            "values": {
                "user_id": 123456
            }
        }],
    "attachments": [{
            "type": "text/plain",
            "name": "myfile.txt",
            "content": "ZXhhbXBsZSBmaWxl"
        }],
    "images": [{
            "type": "image/png",
            "name": "IMAGECID",
            "content": "ZXhhbXBsZSBmaWxl"
        }]
};

console.log("CHIMP");

var async = false;
var ip_pool = "Main Pool";
var send_at = "example send_at";console.log("CHIMPO");

mandrill_client.messages.send({"message": message, "async": async, "ip_pool": ip_pool, "send_at": send_at}, function(result) {
    console.log("CHIMPA");console.log(result);console.log("CHIMPB");
    /*
    [{
            "email": "recipient.email@example.com",
            "status": "sent",
            "reject_reason": "hard-bounce",
            "_id": "abc123abc123abc123abc123abc123"
        }]
    */
}, function(e) {
    // Mandrill returns the error as an object with name and message keys
    console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
    // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
});

/*
var logger = require('./logger'),
    MandrillAPI = require('mailchimp').MandrillAPI;

//var API_KEY = '';

try {
    var mandrill = new MandrillAPI(API_KEY, { version : '1.0', secure: false });
} catch (error) {
    logger.error(error);
}

var CATEGORY = 'messages';
var METHOD = 'send-template';

exports.sendOrderConfirmationToCustomer = function(params, callback){console.log("CHIMP");
    var paramsMailchimpCall = {
        'template_name':'confirmaci-n-orden-usual',
        'template_content': [],
        'message': {
            'global_merge_vars': [
                { 'name': 'ORDER_ID', 'content': params.orderId },
                { 'name': 'MANIFEST', 'content': params.manifest },
                { 'name': 'URL_CANCEL_ORDER', 'content': params.urlCancelOrder },
                { 'name': 'PICKUP_FORMATTED_ADDRESS', 'content': params.pickupFormattedAddress },
                { 'name': 'DROPOFF_FORMATTED_ADDRESS', 'content': params.dropoffFormattedAddress }],
            'to' : [
                //{ 'email' : params.customerEmail }
                { 'email' : 'sango265@hotmail.com' }
            ] }};
    mandrill.call(CATEGORY, METHOD, paramsMailchimpCall, function(err, res){
        if(callback){
            callback(err, res);
        }
    });
};
*/