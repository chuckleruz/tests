/* 
 *
 */

var Contact = {

    /**
     *
     * @returns {undefined}
     */
    init: function(){

        // Initialize data.
        Contact.form = '.contact-form';
        Contact.elements = [
            'input[name=Nombre]',
            'input[name=Telefono]',
            'input[name=Email]',
            'textarea[name=Mensaje]'
        ];

        Contact.inputs().on('change', Contact.onChange);
        $(Contact.form).submit(Contact.onSubmit);

    },

    inputs: function(){
        return $(Contact.form).find( Contact.elements.join() );
    },

    /**
     *
     * @param {jQuery} element
     *
     * @returns {undefined}
     */
    isValid: function(element){
        var type = element.attr('name');
        var value = element.val();

        if(!value) return false;

        if(type === 'Tipo_de_fibra' || type === 'Cotizar_pista_para_correr'){
            var inputs = $('input[name=' + type + ']'),
                band = false;

            inputs.each(function(){
                if($(this).is(':checked'))
                    band = true;
            });

            return band;

        } else {
            switch(type){
                case 'Email':
                    var pattern = /[\w-\.]{3,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
                    return pattern.test(value);
                case 'Telefono':
                    return value.replace(/[^0-9]/g, '').length === 6;
                case 'Nombre':
                    return value.length > 3;
                case 'Ciudad':
                    return value.length > 3;    
                case 'Mensaje':
                    return true;
                default:
                    if(console && console.log)
                        console.log("Unknown validation type: " + type);
                    return true;
            }
        }
    },

    /**
     *
     * @returns {undefined}
     */
     onChange: function(){
        var element = $(this);

        if(element.data('error-element')){
            element.data('error-element').fadeOut(function(){ $(this).remove(); });
            element.data('error-element', null);

            element.css('border', '1px solid #fff');
        }

        if(!Contact.isValid(element)){
            element.data('error-element',
                $('<div>')
                    .insertBefore(element)
                    .addClass('data-clue')
                    .text( element.data('clue') ? element.data('clue') : 'Inválido' )
                    .hide()
                    .fadeIn()
            );
            element.css('border', '1px solid #FF0000');
        }
    },

    /**
     *
     * @param {jQuery Event} event
     *
     * @returns {undefined}
     */

    onSubmit: function(event) {
        // Stops the defualt event of the submit.
        event.preventDefault();

        var form = $(this);
        var valid = true;

        Contact.inputs().change().each(function() {
            var element = $(this);

            if (!Contact.isValid(element))
                valid = false;

        });

        if (!valid) {
            alert("Hay campos inválidos, por favor revisa las indicaciones en rojo.");
        } else {

            var data = form.serialize();
            var ContactResponse = $('<span>').addClass('contact-response');

            $.ajax({

                data: {
                    host: location.hostname,
                    data: data
                },

                dataType: 'html',
                type: 'GET',
                //url: 'http://goplek.com/mailer/send-mail.php',
                  url: 'send-mail.php',


                beforeSend: function(jqXHR, settings) {
                    $(Contact.form)
                        .empty()
                        // .append( ContactResponse.text('Enviando...') );
                        .css('background', 'url(design/imgs/loader-bg-white.gif) no-repeat center center');
                },

                error: function(jqXHR, textStatus) {
                    $(Contact.form)
                        .css('background', 'none')
                        .append(ContactResponse.text('Error: No se pudo entregar el mensaje.'));
                         setTimeout(6000);
                },

                success: function(data, textStatus, jqXHR) {

                    var s = parseInt(data);

                    if (s == 1) {
                        $(Contact.form)
                            .css('background', 'none')
                            .append(ContactResponse.text('El mensaje fue entregado correctamente.'));
                             setTimeout(6000);
                    } else {
                        $(Contact.form)
                            .css('background', 'none')
                            .append(ContactResponse.text('No se pudo entregar el mensaje. Intentalo mas tarde.'));
                            setTimeout(6000);
                    }

                }

            });

        }
    }

};

$(Contact.init);