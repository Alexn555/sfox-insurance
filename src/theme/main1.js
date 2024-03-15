const mainColor = '#c5569a';

export const themeMain1 = {
    layout: {
        background: '#f0f0f0'
    },
    ui: {
        line: {
            start: mainColor,
            mid: '#f9872d',
            end: '#f5b341'      
        },
        button: {
            default: '#ee7023',
            action: '#913a83',
            highlight: '#7d5c78',
            passive: '#31a3ae'
        },
        slider: {
            thumb: '#cb6ade',
            range: '#cb6ade'     
        },
        select: {
            background: '#ebf8f2',
            text: 'black'
        },
        accountTable: {
            head: '#e9f7fb',
            row: '#ebe7e2',
            link: '#257886',
        }
    },
    header: {
        background: 'white',
        overlayBg: '#9e8b88',
        menu: {
            background: 'white',
            line: '#ebe7e2',
            item: {
                active: '#913a83'
            }
        }
    },
    page: {
        common: {
            title: mainColor
        },
        tabs: {
            background: 'white',
            border: '#f7f5f3',
            hover: mainColor,
        },
        home: {
            account: {
                background: 'white',
                headerLink: '#257886'
            },
            banners: {
                background: 'white',
                link: '#257886',
                itemBorder: mainColor
            }
        },
        insurance: {
            banner: {
                background: 'white',
                content: {
                    background: '#ebf8f2',
                    link: '#257886',
                    circle: '#fdc129',
                }
            },
            calculation: {
                background: 'white',
                border: '#e3e3e3'
            },
            payment: {
                background: 'white',
                error: '#c8131c'
            }
        }
    },
    footer: {
        background: '#f7edf6',
        contact: {
            phone: '#f35b1c',
            email: '#257886'
        },
        disclaimer: {
            background: 'white',
            text: '#666666'
        },
        links: {
            text: '#512b2b',
            poiner: '#512b2b',
            link: '#512b2b'
        }
    }
};