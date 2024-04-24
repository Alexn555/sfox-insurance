const mainColor = '#1483c9';

export const themeBlue = {
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
            action: mainColor,
            highlight: '#424b8f',
            passive: '#31a3ae'
        },
        slider: {
            thumb: mainColor,
            range: mainColor    
        },
        select: {
            background: mainColor,
            text: 'white'
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
    settings: {
        textSize: {
            border: mainColor,
            indicator: '#769fdb'
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
                itemBorder: '#c5569a'
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
                border: '#ad0e2b'
            },
            payment: {
                background: 'white',
                error: '#c8131c'
            }
        }
    },
    account: {
        login: {
            error: {
                text: 'red'
            }
        }
    },
    imageViewer: {
        error: {
            bck: 'black',
            border: 'red',
            text: 'white'
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
            text: mainColor
        },
        links: {
            text: '#512b2b',
            poiner: '#512b2b',
            link: '#512b2b'
        }
    }
};