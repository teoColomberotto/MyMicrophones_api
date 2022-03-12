import User from '../api/user';
import Microphone from '../api/microphone';
import Settings from '../api/settings';

export default (context, inject) => {
    const factories = {
        user: User(context.$axios),
        microphone: Microphone(context.$axios),
        settings: Settings(context.$axios),
    };

    inject('api', factories);
};
