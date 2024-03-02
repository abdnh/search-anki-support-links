function setupSearchbar() {
    const resultsContainer = document.getElementById("anki-search-results");
    document.body.addEventListener("keydown", (event) => {
        const results = resultsContainer.children;
        if (!results.length) return;
        const selected = Array.from(results).findIndex((el) =>
            el.classList.contains("selected")
        );
        if (selected >= 0 && event.key === "Enter") {
            results[selected].click();
            return;
        }
        let newSelected;
        if (event.key === "ArrowDown") {
            newSelected = (selected + 1) % results.length;
        } else if (event.key === "ArrowUp") {
            if (selected <= 0) {
                newSelected = results.length - 1;
            } else {
                newSelected = selected - 1;
            }
        } else {
            return;
        }
        if (selected >= 0) {
            results[selected].classList.remove("selected");
        }
        results[newSelected].classList.add("selected");
        results[newSelected].scrollIntoView({ block: "center" });
    });
    const input = document.querySelector("input");
    chrome.runtime.sendMessage("get-links", (links) => {
        input.addEventListener("input", () => {
            const matchedLinks = [];
            const searchText = input.value
                .replace(/\s{2,}/g, " ")
                .replace(/\s/g, "-")
                .trim();
            if (searchText) {
                for (const link of links) {
                    if (link.search(searchText) !== -1) {
                        matchedLinks.push(link);
                    }
                }
            }
            resultsContainer.innerHTML = "";
            if (matchedLinks.length) {
                resultsContainer.style.marginTop =
                    "calc(var(--item-height) + 4px)";
            } else {
                resultsContainer.style.marginTop = "0px";
            }
            for (const link of matchedLinks) {
                const result = document.createElement("li");
                result.classList.add("anki-search-result");
                result.tabIndex = 0;
                result.textContent = link;
                resultsContainer.appendChild(result);
                result.addEventListener("click", async () => {
                    const [tab] = await chrome.tabs.query({
                        currentWindow: true,
                        active: true,
                    });
                    await chrome.tabs.sendMessage(tab.id, link);
                    window.close();
                });
            }
            if(resultsContainer.firstElementChild) {
                resultsContainer.firstElementChild.classList.add("selected");
            }
        });
    });
}

setupSearchbar();
