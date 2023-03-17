import { Form as VeeForm, Field as VeeField, configure, defineRule, ErrorMessage } from 'vee-validate';
import { required, min, max, min_value as minValue, max_value as maxValue, email, alpha_spaces as alphaSpaces, confirmed, not_one_of as excluded } from '@vee-validate/rules'

export default {
    install(app) {
        app.component('VeeForm', VeeForm);
        app.component('VeeField', VeeField);
        app.component('ErrorMessage', ErrorMessage);

        defineRule('required', required);
        defineRule('min', min);
        defineRule('max', max);
        defineRule('alpha_spaces', alphaSpaces);
        defineRule('email', email);
        defineRule('min_value', minValue);
        defineRule('max_value', maxValue);
        defineRule('confirmed', confirmed);
        defineRule('excluded', excluded);


        configure({
                    generateMessage: (ctx) => {
                            const messages = {
                                    required: `${ctx.field === 'country' ? 'Please select country' : `${ctx.field} wajib diisi`}`,
                min: `min ${ctx.field} 3 character`,
                max: `max ${ctx.field} 30 character`,
                email: `field ${ctx.field} harus email tod`,
                excluded: 'Please select country',
                confirmed: 'confirm password harus sama dengan password'
                };

                const message = messages[ctx.rule.name] ? messages[ctx.rule.name] : 'the field context is invalid'

                return message;
            },
            validateOnBlur: true,
            validateOnChange: true,
            validateOnInput: false,
            validateOnModelUpdate: true
        });
    }
}