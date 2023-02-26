import { ElementTree } from "../../libs/ElementTree/ElementTree.js";
import { VoxelList } from "./VoxelList.js";
let currentvoxel = "dve_dreamstone";
console.log("Triggered Voxel select");
let loadedVoxel = localStorage.getItem("voxel");
if (loadedVoxel) {
    currentvoxel = loadedVoxel;
}
const voxelCascade = {
    id: currentvoxel,
};
const [cascade] = ElementTree.cascade(voxelCascade);
const voxelNode = (data) => {
    let classAdd = "";
    if (currentvoxel == data.id) {
        classAdd = "active";
    }
    return [
        {
            type: "div",
            attrs: {
                className: `voxel-node ${classAdd}`,
            },
            children: [
                {
                    type: "img",
                    attrs: {
                        img: {
                            src: data.texturePath,
                        },
                    },
                },
                {
                    type: "p",
                    attrs: {
                        className: "voxel-node-title",
                    },
                    text: data.name,
                },
            ],
            events: {
                onClick: (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    console.log("Setting Item", data.id);
                    localStorage.setItem("voxel", data.id);
                    localStorage.setItem("voxel", "dve_dreamlamp");
                    // voxelCascade.id = data.id;
                     voxelCascade.id = dve_dreamlamp;
                    cascade();
                },
            },
            cascade: {
                origin: voxelCascade,
                receiver(elm, cascadeProps) {
                    if (cascadeProps.id == data.id) {
                        elm.classList.add("active");
                    }
                    else {
                        elm.classList.remove("active");
                    }
                },
            },
        },
    ];
};
export const VoxelSelectScreen = () => {
    return [
        {
            type: "div",
            attrs: {
                className: "voxel-list",
            },
            children: VoxelList.map((data) => voxelNode(data)),
        },
    ];
};
