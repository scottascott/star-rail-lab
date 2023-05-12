const https = require("https");
const cheerio = require("cheerio");
const fs = require("fs");

let ws = fs.createWriteStream('./allList.json')
const crawlIndex = () => {
    https.get("https://honkailab.com/", function (res) {
        let html = "";
        res.on("data", function (chunk) {
            html += chunk;
        });
        res.on("end", function () {
            const $ = cheerio.load(html);
            let linkList = [];
            $(".uc_post_list .uc_post_list_box").each(function () {
                const img = $(".uc_post_list_image a img", this).attr("data-src");
                const name = $(".uc_post_list_title", this)
                    .text()
                    .replace(" Build", "")
                    .replace(" build", "");
                const href = $(".uc_post_list_title a", this).attr("href");
                linkList.push({
                    img,
                    name,
                    href,
                });
            });
            // remove dulplicate
            linkList = linkList.slice(0, linkList.length / 2);
            /**
             * write allList file
             */
            linkList.map((item)=>{
                const {img,name,href}=item
                crawSinglePage(img,name,href);
            })
            /**
             * write index file
             */ 
            // let ws = fs.createWriteStream('./index.json')
            // ws.write(JSON.stringify(linkList));
            // ws.end()
        });
    });
};

crawlIndex();

const nameCat = (name) => {
    if (name.length == 2 && name[0] == "E" && !isNaN(name[1])) return "Eidolons";
    else if (name.indexOf(" ") > 0 && !isNaN(name.substr(name.indexOf(" ") + 1))) return "Stats";
    else if (name == "Ultiimate" || name == "Skill" || name == "Talent" || name == "Normal Atk")
        return "Abilities";
    else return "Null";
};

const crawSinglePage = (img,name,href) => {
    https.get(href, function (res) {
        let html = "";
        res.on("data", function (chunk) {
            html += chunk;
        });
        res.on("end", function () {
            const $ = cheerio.load(html);
            let priority = [];
            let priority2 = "";
            let team = [];
            // priority
            $(".wp-caption").each(function () {
                const img = $("img", this).attr("data-src");
                const name = $("figcaption", this).text().trim();
                const cat = nameCat(name);
                if (cat != "Null") {
                    priority.push({
                        img,
                        name,
                        cat,
                    });
                }
            });
            $(".e-con-inner .elementor-element .elementor-widget-container p em span").each(
                function () {
                    priority2 += $(this).text();
                }
            );
            // team
            $(
                ".elementor-column, .elementor-col-100, .elementor-top-column, .elementor-element .elementor-widget-wrap, .elementor-element-populated.elementor-section, .elementor-inner-section, .elementor-element, .elementor-section-boxed, .elementor-section-height-default, .elementor-section-height-default"
            ).each(function () {
                if ($(this).attr("data-settings") == '{"jet_parallax_layout_list":[]}') {
                    const p1 = $("div div:nth-child(1)", this);
                    const p2 = $("div div:nth-child(2)", this);
                    const p3 = $("div div:nth-child(3)", this);
                    const img = $("div div div a img", p1).attr("data-src");
                    const name = $("div div div p span", p2).text();
                    // const cat = $("div div div p em strong", p2).text().replace(name,"");
                    const icon = $("div div div", p2).find("img").attr("data-src");
                    const des = $("div div div p", p3).text();
                    if (img) {
                        team.push({
                            img,
                            name,
                            // cat,
                            icon,
                            des,
                        });
                    }
                }
            });
            const finalResult={
                img,
                name,
                priority,
                priority2,
                team
            }

            ws.write(JSON.stringify(finalResult)+",");
        });
    });
};

// test
// crawSinglePage("1","a","https://honkailab.com/characters/himeko-build/");
// crawSinglePage("1","a","https://honkailab.com/characters/herta-build/");
