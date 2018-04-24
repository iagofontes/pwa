const Mural = (function(_render, Filtro){
    "use strict"
    // (localStorage.getItem('cartoes')==true?localStorage.getItem('cartoes').toString():"[]"))
    let cartoes = getUserCards();
    // console.log(cartoes);
    cartoes.forEach(card=>{
        preparaCartoes(card);
    });
    
    // console.log(cartoes);
    
    // let cartoes = JSON.parse(localStorage.getItem("cartoes") || [])
    //                 .map(cartaoLocal => new Cartao(cartaoLocal.conteudo, cartaoLocal.tipo))
    const render = () => _render({cartoes: cartoes, filtro: Filtro.tagsETexto});
    render()
    Filtro.on("filtrado", render)
    
    login.on('login', ()=>{
        cartoes = getUserCards();
        render();
    });

    login.on('logout', ()=>{
        cartoes = [];
        render();
    });

    function getUserCards(){
        return JSON.parse(
            (localStorage.getItem(user)||"[]"))
            .map(
                cardLocal=>new Cartao(cardLocal.conteudo, cardLocal.tipo)
            );
    }

    function preparaCartoes(cartao){
        cartao.on("mudanca.**", salvaCartoes)
        cartao.on("remocao", ()=>{
            cartoes = cartoes.slice(0);
            cartoes.splice(cartoes.indexOf(cartao), 1)
            salvaCartoes();
            render()
        })
    }

    function salvaCartoes(){
        localStorage.setItem(user, 
            JSON.stringify(
                cartoes.map(
                    card=>(
                        {"conteudo":card.conteudo, "tipo":card.tipo}
                    )
                )
            )
        );
    }

    function adiciona(cartao){
        // console.log(logado);
        if(logado){
            cartoes.push(cartao)
            salvaCartoes();
            preparaCartoes(cartao);
            // cartao.on("mudanca.**", render)
            // cartao.on("remocao", ()=>{
            //     cartoes = cartoes.slice(0);
            //     cartoes.splice(cartoes.indexOf(cartao), 1)
            //     render()
            // })
            render()
            return true
        }else{
            alert("Usuário não está logado.");
        }
        // }else{
        //     alert('Usuário deslogado.')
        // }
    }

    return Object.seal({
        adiciona
    })

})(Mural_render, Filtro)
