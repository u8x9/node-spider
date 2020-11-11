const { Builder, By, Key, until } = require('selenium-webdriver');

let currentPage = 1; // 当前页
let totalPage = 1; // 总页数

(async function start() {
    let driver = await new Builder().forBrowser('chrome').build();
    await driver.get('https://lagou.com');
    // 选择“全国”
    await driver.findElement(By.css('a[data-city="全国"]')).click();
    // 搜索关键字
    await driver.findElement(By.id('search_input')).sendKeys("node", Key.RETURN);
    // 获取总页数
    let pager = await driver.findElement(By.css('.span.totalNum')).getText();
    totalPage = parseInt(pager, 10);
    // 抓取数据
    getData(driver);
})();


async function getData(driver) {
    while (true) {
        let flag = true;
        try {
            console.log(`---- 正在获取第 ${currentPage} 页的数据，总共 ${totalPage} 页 -----`)
            // 结果
            let items = await driver.findElements(By.css('.item_con_list .con_list_item'));
            let list = [];
            for (let i = 0; i < items.length; i++) {
                let item = items[i];
                let jobTitle = await item.findElement(By.css('.p_top h3')).getText();
                let jobLink = await item.findElement(By.css('.p_top a.position_link')).getAttribute('href');
                let loc = await item.findElement(By.css('.p_top span.add em')).getText();
                let pubtime = await item.findElement(By.css('.p_top span.format-time')).getText();
                let company = await item.findElement(By.css('.company > .company_name > a'))
                let companyName = await company.getText();
                let companyLink = await company.getAttribute('href');

                list.push({
                    job: jobTitle,
                    jobLink: jobLink,
                    loc: loc,
                    pubtime: pubtime,
                    companyName: companyName,
                    companyLink: companyLink,
                });
            }
            console.log(list.length);
            currentPage++;
            if (currentPage <= totalPage) {
                // 点击下一页
                await driver.findElement(By.css('.pager_next')).click();
                getData(driver);
            }
        } catch (e) {
            if (e) {
                flag = false;
            }
        } finally {
            if (flag) {
                break;
            }
        }
    }
}
