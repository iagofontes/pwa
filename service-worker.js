let versao = 12;
let arquivos = [
"/",
"css/estilos.css",
"css/opcoesDaPagina.css",
"css/opcoesDoCartao.css",
"css/cabecalho.css",
"css/login.css",
"css/loginForm.css",
"css/loginStatus.css",
"css/cartao.css",
"css/novoCartao.css",
"css/mural.css",
"js/lib/jquery.js",
"js/lib/eventemitter2.js",
"js/lib/KeyBoardNavigation.js",
"js/tags/Tags.js",
"js/cabecalho/mudaLayout.js",
"js/cabecalho/busca.js",
"js/filtro/Filtro.js",
"js/tipos/TiposCartao.js",
"js/cartao/render/Cartao_renderHelpers.js",
"js/cartao/render/CartaoOpcoes_render.js",
"js/cartao/render/CartaoConteudo_render.js",
"js/cartao/render/Cartao_render.js",
"js/cartao/Cartao.js",
"js/login/LoginUsuario_render.js",
"js/login/LoginUsuario.js",
"js/mural/render/Mural_render.js",
"js/mural/Mural.js",
"js/cabecalho/novoCartao.js",
"img/bin2.svg",
"img/edit.svg"
];

self.addEventListener('activate', (ev)=>{
    caches
    .open(`ceep-arquivos-${versao}`)
    .then((cache)=>{
        cache
            .addAll(arquivos)
            .then(()=>{
                caches.delete(`ceep-arquivos-${(versao-1)}`);
                caches.delete(`ceep-arquivos`);
            })
    });

});

self.addEventListener("fetch", (ev)=>{
    let pedido = ev.request;
    let promisse = 
    caches
        .match(pedido)
        .then((response)=>{
            return (response?response:fetch(pedido));
        });
    // caches
    //     .open('ceep-imagens')
    //     .then(cache=>cache.match(pedido))
    //     .then((response)=>{
    //         // let responseFiltered = response ? response : fetch(pedido);
    //         // return responseFiltered;
    //         return (response?response:fetch(pedido));
    //     });

    ev.respondWith(promisse);
});