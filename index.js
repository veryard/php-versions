(async () => {

    const versions = await fetch("https://windows.php.net/downloads/releases/archives/", {
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36"
        }
    })
        .then((res) => res.text());

    const set = new Map();

    let lines = versions.split("php-");
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        // if line contains "pack" or "src" then skip
        if (line.includes("pack") || line.includes("src") || line.includes(".msi") || line.includes("<html>")) {
            continue;
        }

        let name = `php-${line.split(".zip")[0]}`;
        set.set(name, {
            name,
            url: `https://windows.php.net/downloads/releases/archives/php-${line.split(".zip")[0]}.zip`,
            version: name.split("-")[1]
        });
    }

    // write to file called versions.json node
    const fs = require("fs");
    fs.writeFileSync("versions.json", JSON.stringify([...set.values()], null, 4));
})();
