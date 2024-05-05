export class RenderService {
    static showComponent(isEnabled, template) {
        if (isEnabled) {
            return template;
        }
        return '';
    }
}