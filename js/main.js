//Importa a biblioteca THREE.js
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
//Permite que a câmera se mova ao redor da cena
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
//Permite a importação do arquivo .gltf
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

//Cria uma cena do Three.JS
const scene = new THREE.Scene();
//Cria uma nova câmera com posições e ângulos
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//Mantém o controle da posição do mouse para movimentar o olho
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

//Mantém o objeto 3D em uma variável global para acesso posterior
let object;

//OrbitControls permite que a câmera se mova ao redor da cena
let controls;

//Define qual objeto será renderizado
let objToRender = 'car';

//Instancia um carregador para o arquivo .gltf
const loader = new GLTFLoader();

//Carrega o arquivo
loader.load(
  `models/${objToRender}/scene.gltf`,
  function (gltf) {
    //Se o arquivo for carregado, adiciona-o à cena
    object = gltf.scene;
    scene.add(object);
  },
  function (xhr) {
    //Enquanto o arquivo está carregando, exibe o progresso no console
    console.log((xhr.loaded / xhr.total * 100) + '% carregado');
  },
  function (error) {
    //Se houver um erro, exibe-o no console
    console.error(error);
  }
);

//Instancia um novo renderizador e define seu tamanho
const renderer = new THREE.WebGLRenderer({ alpha: true }); //Alpha: true permite fundo transparente
renderer.setSize(window.innerWidth, window.innerHeight);

//Adiciona o renderizador ao DOM
document.getElementById("container3D").appendChild(renderer.domElement);

//Define a distância da câmera em relação ao modelo 3D
camera.position.z = 4;

//Adiciona luzes à cena para que o modelo 3D fique visível
const topLight = new THREE.DirectionalLight(0xffffff, 5); // (cor, intensidade)
topLight.position.set(500, 500, 500); //Parte superior à esquerda
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x333333, 10);
scene.add(ambientLight);

//Adiciona controles à câmera para girar/zoomar com o mouse
if (objToRender === "car") {
  controls = new OrbitControls(camera, renderer.domElement);
}

// Função para imprimir a posição da câmera

//Renderiza a cena
function animate() {
  requestAnimationFrame(animate);
  //Aqui podemos adicionar código para atualizar a cena, como movimento automático
  renderer.render(scene, camera);
  //logCameraPosition();
}

function logCameraPosition() {
  console.log(`Camera Position: x=${camera.position.x}, y=${camera.position.y}, z=${camera.position.z}`);
}

window.addEventListener("keydown", function (e) {
  if (e.key === ' ') {
    logCameraPosition();
  }
});

//Adiciona um listener à janela para redimensionar a janela e atualizar a câmera
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

//Adiciona um listener para a posição do mouse, permitindo movimentar o objeto
document.onmousemove = (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
}

//Inicia a renderização 3D
animate();
