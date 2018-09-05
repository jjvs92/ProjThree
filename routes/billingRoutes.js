const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');
const { exec } = require('child_process');


module.exports = app => {
    app.post('/api/stripe', requireLogin, async (req, res) => {
        

        //creating the charge here
        const charge = await stripe.charges.create({
            amount: req.body.price,
            currency: 'usd',
            description: 'money for art',
            source: req.body.id,
            application_fee: req.body.platform_fee
        }, {
            stripe_account: req.body.stripe_account
          });
        const user = await req.user.save();


        console.log('req.body', req.body)
        
        res.send(user);
    });

    app.get('/api/stripe', (req, res) => {
        //  res.redirect('/')
        const url = req.originalUrl;
        const splitURL = url.split('=');
        const targetQueryCode = splitURL[2];

        var cmd = `curl https://connect.stripe.com/oauth/token -d client_secret=sk_test_uDaKbfwMIWARk54H2UiKxeIv -d code="${targetQueryCode}" -d grant_type=authorization_code`;

        exec(cmd, function(error, stdout, stderr) {
          console.log(`stdout: ${stdout}`)
          const returnData = stdout
          const splitItUp = returnData.split('"stripe_user_id": "')
          const splitItUpAgain = splitItUp[1].split('""scope":')
          const targetedStripeAccount = splitItUpAgain[0].slice(0,21)
          console.log('test', targetedStripeAccount)

          res.send("Copy this ID and paste it into the admin form to start accepting payments through Art Gutter: " + targetedStripeAccount)

          //take sent account number and paste into form field for stripe account as a user
          
        //   app.get('/api/current_user', (req, res) => {
        //     res.json(req.user);
        // })

          // fetch current user
          // and then do a put route to update the current user's target stripe accout id in our database
        });
    })
};

// *********************************************************************************************
// ************ URL brought back from going through the stripe oAuth Process *******************
// *********************************************************************************************
// keibooher@gmail.com stripe that registered for our app returned: 
// http://localhost:3000/api/stripe/?scope=read_write&code=ac_DW9PDT7JFl68eSv2yKHUMcMGyOmaKK1z


// *************************************************
// ******************* curl request ****************
// *************************************************
// $ curl https://connect.stripe.com/oauth/token 
// -d client_secret=sk_test_uDaKbfwMIWARk54H2UiKxeIv 
// -d code="ac_DWKaguXB4R7xSdaISIvDZKxLNtAZF8Y0" 
// -d grant_type=authorization_code


// ********************************************************
// **************** Response to curl Request **************
// ********************************************************
// "access_token": "sk_test_UouLbnFMyZwBZXESXboDeWVS",
// "livemode": false,
// "refresh_token": "rt_DWKayariSj5HIMgtFOYrLOriq6hiSGPAfUj3Cyu3NwOVK5Kw",
// "token_type": "bearer",
// "stripe_publishable_key": "pk_test_zCS5GowOndpV7su7CvLzNcQM",
// "stripe_user_id": "acct_1D570wLWgPyrropm",
// "scope": "read_write"



