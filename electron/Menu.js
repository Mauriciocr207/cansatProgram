const templateMenu = [
    {
        label: "File",
        submenu: [
            {
                label: "New File",
                accelerator: "Ctrl+N",
                click() {
                    console.log("New File");
                }
            }
        ]
    },
    {
        label: "Documentation",
        submenu: [
            {
                label: "Read Documentation",
                accelerator: "Ctrl+D",
                click() {
                    console.log("This is documentation");
                }
            }
        ]
    }
];
module.exports = { templateMenu }