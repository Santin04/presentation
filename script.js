import { Components, SimpleScene, SimpleRenderer, OrthoPerspectiveCamera, FragmentIfcLoader } from "openbim-components";

//PARTE DE ALTERAR OS ELEMENTOS HTML (DOM)
//selecionando os elementos que vai ser alterado
const title = document.querySelector("#title");
const location = document.querySelector("#location");
const info00 = document.querySelector("#info00");
const info01 = document.querySelector("#info01");
const info02 = document.querySelector("#info02");
const info03 = document.querySelector("#info03");
const valor01 = document.querySelector("#valor01");
const valor02 = document.querySelector("#valor02");
const valor03 = document.querySelector("#valor03");
const valor04 = document.querySelector("#valor04");
const graphic = document.querySelector("#graphic");


//lista com todos os valores que vão ser alterados
const list_title = [
    'UFV: CONSERVATÓRIA',
    'UFV: ITU',
    'UFV: RINCÃO',
];

const list_location = [
    'CONSERVATÓRIA - RJ',
    'ITU - SP',
    'RINCÃO - SP',
];

const list_info00 = [
    'Geração: 1MWp',
    'Geração: 4MWp',
    'Geração: 4MWp',
];

const list_info01 = [
    'Cliente: 499',
    'Cliente: NAVI',
    'Cliente: NAVI',
];

const list_info02 = [
    'PM: Augusto',
    'PM: Augusto',
    'PM: Pedro',
];

const list_info03 = [
    'Planner: Diojnes',
    'Planner: Rayssa',
    'Planner: Rayssa',
];

const list_valor01 = [
    'CAPEX DE IMPLANTAÇÃO: R$1.000,00',
    'CAPEX DE IMPLANTAÇÃO: R$2.000,00',
    'CAPEX DE IMPLANTAÇÃO: R$3.000,00',
];

const list_valor02 = [
    'TOTAL MEDIDO: R$1.000,00',
    'TOTAL MEDIDO: R$2.000,00',
    'TOTAL MEDIDO: R$3.000,00',
];

const list_valor03 = [
    'CUSTO ACUMULADO: R$1.000,00',
    'CUSTO ACUMULADO: R$2.000,00',
    'CUSTO ACUMULADO: R$3.000,00',
];

const list_valor04 = [
    'MEDIÇÃO HOJE: R$1.000,00',
    'MEDIÇÃO HOJE: R$2.000,00',
    'MEDIÇÃO HOJE: R$3.000,00',
];

const list_graphic = [
    '/images/teste01.png',
    '/images/teste02.png',
    '/images/teste01.png',
];

//PARTE 3D
//Selecionando os arquivos ifc que vão ser exibidos na tela
const arquivo_ifc = [
    '/files/file001.ifc',
    '/files/file002.ifc',
    '/files/file003.ifc',
]

//função que limpa a div viewer
function limpar_viewer(){
    const viewerContainer = document.querySelector("#viewer_container");
    viewerContainer.innerHTML = ``;
}

//função que exibe os arquivos ifc
async function exibir_ifc(numero){
    limpar_viewer();
    const viewer = new Components();

    const sceneComponent = new SimpleScene(viewer);
    sceneComponent.setup();
    viewer.scene = sceneComponent;
    const scene = sceneComponent.get();
    scene.background = null;

    const viewerContainer = document.querySelector("#viewer_container");
    const rendererComponent = new SimpleRenderer(viewer, viewerContainer);
    viewer.renderer = rendererComponent;

    const cameraComponent = new OrthoPerspectiveCamera(viewer);
    viewer.camera = cameraComponent;

    viewer.init();
    cameraComponent.updateAspect();

    const ifcLoader = new FragmentIfcLoader(viewer);
    ifcLoader.settings.wasm = {
        path: "https://unpkg.com/web-ifc@0.0.43/",
        absolute: true,
    };

    const arquivo = await fetch(arquivo_ifc[numero]);
    const data = await arquivo.arrayBuffer();
    const buffer = new Uint8Array(data);
    const model = await ifcLoader.load(buffer, "example");
    scene.add(model);

    requestAnimationFrame(() => {
        animate(model);
    });
}

function animate(model) {
    requestAnimationFrame(() => animate(model));
    model.rotation.y += 0.005;
}

let indice = 0;

//CHAMANDO AS FUNÇÕES 3D E DOM
//função que troca os conteudo dos elementos
function edit_items() {
    title.innerText = list_title[indice];
    location.innerText = list_location[indice];
    info00.innerText = list_info00[indice];
    info01.innerText = list_info01[indice];
    info02.innerText = list_info02[indice];
    info03.innerText = list_info03[indice];
    valor01.innerText = list_valor01[indice];
    valor02.innerText = list_valor02[indice];
    valor03.innerText = list_valor03[indice];
    valor04.innerText = list_valor04[indice];
    graphic.src = list_graphic[indice];

    exibir_ifc(indice);

    indice = (indice + 1) % arquivo_ifc.length;
}

//chamando a função pela primeira vez
edit_items();

//chamando a função toda vez que passar o intervalo, para deixar dinamico o conteudo
setInterval(edit_items, 40000);