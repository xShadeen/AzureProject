import British from "../Photos/Brithish.jpg";
import Spanish from "../Photos/Spanish.jpg";
import Polish from "../Photos/Polish.jpg";


export const getImageByLanguage = (language) => {
    switch (language) {
        case 'English':
            return British;
        case 'Spanish':
            return Spanish;
        case 'Polish':
            return Polish;
        default:
            return;
    }
}