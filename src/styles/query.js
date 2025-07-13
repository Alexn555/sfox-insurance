let sizes = {
    xs: 768,
    ds: 768,
    md: 1220
};

export default class ScreenQuery {
    static mobile(ct, w = sizes.xs) {
        return '@media (max-width:'+ w +'px) { '+ct+' } ';
    }
    static desk(ct, w = sizes.ds) {
        return '@media (min-width: '+w+'px) { '+ct +' } ';
    }
    static medium(ct, w = sizes.md) {
        return '@media (max-width:'+ w +'px) { '+ct + '} ';
    }
    static combo(ctMob, ctDesk, ctMedium) {
        return '@media (max-width: '+ sizes.xs+'px) { '+ ctMob + ' } ' + 
        '@media (min-width: '+ sizes.ds+'px) { '+ ctDesk + ' } ' + 
        '@media (min-width: ' + sizes.md+'px) { '+ ctMedium + '}';
    }
}