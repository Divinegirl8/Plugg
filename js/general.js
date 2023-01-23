
(function(){
    let general = {
        init: function(){
            this.register();
        },

        getInputValue: function(e){
            return $(e).val();
        },

        getTagText: function(e){
            return $(e).text();
        },

        waitLoader: function (el, num, effect){
            text = 'Please wait...';
            fontSize = '';
            switch (num) {
                case 1:
                    maxSize = '';
                    textPos = 'vertical';
                    break;
                case 2:
                    text = '';
                    maxSize = 30;
                    textPos = 'vertical';
                    break;
                case 3:
                    maxSize = 30;
                    textPos = 'horizontal';
                    fontSize = '18px';
                    break;
            }
            el.waitMe({
                effect: effect,
                text: text,
                bg: 'rgba(255,255,255,0.7)',
                color: '#000',
                maxSize: maxSize,
                waitTime: -1,
                source: 'img.svg',
                textPos: textPos,
                fontSize: fontSize,
                onClose: function(el) {}
            });
        },

        register: function() {
            let validateForm = $('#submitData').parsley();
            let formDataSub = $("form #submitFormBtn");
            formDataSub.on("click",function(e) {
                e.preventDefault();
                
                // get the loader working
                general.waitLoader($('body #content'), 1, 'win8');

                // form validator
                if(validateForm.validate()){
                    // get all inputs
                    let study = general.getInputValue("study");
                    let surname = general.getInputValue("surname");
                    let first = general.getInputValue("first");
                    let call = general.getInputValue("call");
                    let opt = general.getInputValue("opt");
                    let opt2 = general.getInputValue("opt2");
                    let opt1 = general.getInputValue("opt1");

                    // set email data up
                    let emailData = {
                        toEmail: "tomail@example.com",
                        subject: "Your Mail Subject",
                        messageBody: "Your Mail Message"
                    };

                    general.mailSystem2(emailData);

                    // validate the final condition then trigger the email
                    $('body #content').waitMe('hide');
                    
                    let m = {
                        title: "Successfully",
                        message: "Your Message has been sent successfully",
                        type: "success"
                    };
                    general.notificationSystem(m);

                }

            

            });
        },
    
        mailSystem: function(mailData){
            let config = this.configuration();
            Email.send({
                SecureToken : config.stoken1,
                To : mailData.toEmail,
                From : config.fromEmail,
                Subject : mailData.subject,
                Body : mailData.messageBody
            }).then(
                message => console.log(message)
            );
        },

        mailSystem2: function(mailData){
            let config = this.configuration();
            Email.send({
                Host : config.host,
                Username : config.username,
                Password : config.password,
                To : mailData.toEmail,
                From : config.fromEmail,
                Subject : mailData.subject,
                Body : mailData.messageBody
            }).then(
              message => console.log(message)
            );
        },

        notificationSystem: function(data){
            Swal.fire(
                data.title,
                data.message,
                data.type
            )
        },

        configuration: function(){
            let configD = {
                password: "BF53FDB0EE1CB1DD8D8CABE1CA837991709A",
                stoken1: "45c53127-ba36-47df-9d04-86faf3744a7e",
                stoken2: " 3af5860b-5dbd-4af5-9590-6e2e67bf371e",
                fromEmail: "testing@connect.decentralizedfin.live",
                host: "smtp.elasticemail.com",
                username: "testing@connect.decentralizedfin.live",
            }
            
            return configD;
        },
    
    }

    $(document).ready(function () {
        general.init();
    });

})();
