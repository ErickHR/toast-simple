
window.addEventListener( 'DOMContentLoaded', () => {
    
    const toast = document.querySelector('.toast')
    const btn = document.querySelector('.btn')
    let btnToastClose
    const createToast = () => {
        let toastMsg = document.createElement( 'div' )
        toastMsg.classList.add( 'toast__msg' )
        let toastContent = document.createElement( 'div' )
        toastContent.classList.add( 'toast__content' )
        toastContent.innerHTML = 'msg'
        let toastClose = document.createElement( 'div' )
        toastClose.classList.add( 'toast__close' )
        toastClose.innerHTML = '&times'
        toastMsg.append( toastContent )
        toastMsg.append( toastClose )
        toast.prepend( toastMsg )
    }

    const createBtnDeleteAllToast = () => {
        let btnContainer = document.createElement( 'div' )
        btnContainer.classList.add( 'container__btn' )
        let buttonToast = document.createElement( 'button' )
        buttonToast.classList.add( 'btn', 'btn--toast' )
        buttonToast.innerHTML= 'Borrar todos los mensajes'
        btnContainer.append( buttonToast )
        toast.append( btnContainer )
    }

    const removeAllToast = () => {
        if( toast.children.length != 1 ) return
        createBtnDeleteAllToast()
        btnToastClose = document.querySelector( '.btn--toast' )
        btnToastClose.addEventListener( 'click', ( e ) => {
            const allChildrenLength = toast.children.length - 2
            for( let index = allChildrenLength; index >= 0; index-- ) {
                let tagRemove = toast.children[ index ]
                const timeoutAddClass = ( allChildrenLength - index + 1 ) * 100
                const timeoutClose = ( allChildrenLength - index + 1 ) * 60
                setTimeout(() => {
                    tagRemove.classList.add( 'remove__toast' )
                    setTimeout( () => {
                        toast.removeChild( tagRemove )
                        if( index == 0 ) {
                            setTimeout( () => {
                                toast.children[ index ].classList.add( 'remove__toast' )

                                setTimeout( () => {
                                    toast.removeChild( toast.children[ index ] )
                                }, timeoutClose )

                            },  80 )
                        }
                    // }, 100 )
                    }, timeoutClose )
                }, timeoutAddClass );

            }
            
        } )

    }

    btn.addEventListener( 'click', ( e ) => {
        createToast( e.target )
        removeAllToast()
    } )

    toast.addEventListener( 'click', ( e ) => {
        if( !e.target.classList.contains( 'toast__close' ) ) return
        e.target.parentNode.classList.add( 'remove__toast' )
        setTimeout( () => {
            toast.removeChild( e.target.parentNode )
            if( toast.children.length != 1 ) return
                setTimeout( () => {
                    toast.children[ 0 ].classList.add( 'remove__toast' )

                    setTimeout( () => {
                        toast.removeChild( toast.children[ 0 ] )
                    }, 80 )

                },  80 )
        }, 300 )
    } )

} )
