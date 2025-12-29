(function() {
    const selectors = [
        'div[data-sgrd="true"]',
        'div[jscontroller][data-ail]',
        '#m-x-content',
        'div[data-async-context*="async_rq"]',
        'div.M8OgIe',
        'div[jsname="N760b"]',
        'div[data-hveid][data-ved] div[data-md]',
        'div.liYKde',
        'div[data-attrid="SGEnterpriseAI"]'
    ];

    function hideAIOverview() {
        selectors.forEach(function(selector) {
            document.querySelectorAll(selector).forEach(function(element) {
                if (isAIOverviewElement(element)) {
                    element.style.display = 'none';
                }
            });
        });
        
        hideByTextContent();
    }

    function isAIOverviewElement(element) {
        const text = element.innerText || '';
        const keywords = ['AI Overview', 'Generative AI', 'AI-generated'];
        
        for (let i = 0; i < keywords.length; i++) {
            if (text.includes(keywords[i])) {
                return true;
            }
        }
        
        if (element.querySelector('div[data-ail]')) {
            return true;
        }
        
        return false;
    }

    function hideByTextContent() {
        const headers = document.querySelectorAll('h2, div[role="heading"]');
        
        headers.forEach(function(header) {
            const text = header.innerText || '';
            if (text.includes('AI Overview')) {
                let parent = header.parentElement;
                for (let i = 0; i < 5; i++) {
                    if (parent && parent.tagName !== 'BODY') {
                        if (parent.classList.length > 0 || parent.hasAttribute('data-sgrd')) {
                            parent.style.display = 'none';
                            break;
                        }
                        parent = parent.parentElement;
                    }
                }
            }
        });
    }

    function init() {
        hideAIOverview();

        const observer = new MutationObserver(function(mutations) {
            let shouldCheck = false;
            
            mutations.forEach(function(mutation) {
                if (mutation.addedNodes.length > 0) {
                    shouldCheck = true;
                }
            });
            
            if (shouldCheck) {
                hideAIOverview();
            }
        });

        observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.addEventListener('load', hideAIOverview);
    
    setTimeout(hideAIOverview, 500);
    setTimeout(hideAIOverview, 1500);
    setTimeout(hideAIOverview, 3000);
})();
