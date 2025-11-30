document.addEventListener('DOMContentLoaded', () => {
    const accordionTriggers = document.querySelectorAll('.accordion-trigger');
    accordionTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const panel = trigger.nextElementSibling;
            const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
            const currentAccordionContainer = trigger.closest('.accordion-container');
            if (currentAccordionContainer) {
                currentAccordionContainer.querySelectorAll('.accordion-trigger').forEach(otherTrigger => {
                    if (otherTrigger !== trigger) {
                        otherTrigger.classList.remove('active');
                        otherTrigger.setAttribute('aria-expanded', 'false');
                        if (otherTrigger.nextElementSibling) {
                            otherTrigger.nextElementSibling.classList.remove('visible');
                        }
                    }
                });
            }
            trigger.classList.toggle('active');
            panel.classList.toggle('visible');
            trigger.setAttribute('aria-expanded', !isExpanded);
        });
    });

    const trainingTabs = [
        { btn: 'btn-show-exercicios', wrap: 'exercicios-content-wrapper' },
        { btn: 'btn-show-listening', wrap: 'listening-content-wrapper' },
        { btn: 'btn-show-vocabulary', wrap: 'vocabulary-content-wrapper' },
        { btn: 'btn-show-speaking', wrap: 'speaking-content-wrapper' },
        { btn: 'btn-show-writing', wrap: 'writing-content-wrapper' },
        { btn: 'btn-show-reading', wrap: 'reading-content-wrapper' }
    ];

    const toggleTabs = (tabs, btnElement, wrapElement) => {
        const isVisible = wrapElement.classList.contains('visible');
        if (isVisible) {
            wrapElement.classList.remove('visible');
            btnElement.setAttribute('aria-expanded', 'false');
        } else {
            tabs.forEach(otherTab => {
                const otherWrap = document.getElementById(otherTab.wrap);
                const otherBtn = document.getElementById(otherTab.btn);
                if (otherWrap && otherWrap !== wrapElement) otherWrap.classList.remove('visible');
                if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
            });
            wrapElement.classList.add('visible');
            btnElement.setAttribute('aria-expanded', 'true');
        }
    };

    trainingTabs.forEach(tab => {
        const btnElement = document.getElementById(tab.btn);
        const wrapElement = document.getElementById(tab.wrap);
        if (btnElement && wrapElement) btnElement.addEventListener('click', () => toggleTabs(trainingTabs, btnElement, wrapElement));
    });

    const resourceTabs = [
        { btn: 'btn-show-artigos', wrap: 'artigos-content-wrapper' },
        { btn: 'btn-show-vocabulario', wrap: 'vocabulario-content-wrapper' },
        { btn: 'btn-show-ferramentas', wrap: 'ferramentas-content-wrapper' }
    ];

    resourceTabs.forEach(tab => {
        const btnElement = document.getElementById(tab.btn);
        const wrapElement = document.getElementById(tab.wrap);
        if (btnElement && wrapElement) btnElement.addEventListener('click', () => toggleTabs(resourceTabs, btnElement, wrapElement));
    });

    const setupCollapsible = (buttonId, contentId, textOpen, textClose) => {
        const button = document.getElementById(buttonId);
        const content = document.getElementById(contentId);
        if (button && content) {
            button.addEventListener('click', () => {
                content.classList.toggle('visible');
                const isVisible = content.classList.contains('visible');
                button.textContent = isVisible ? textClose : textOpen;
                button.setAttribute('aria-expanded', isVisible);
            });
        }
    };
    setupCollapsible('toggle-sobre-btn', 'sobre-texto', 'Ler Mais', 'Ocultar');
    setupCollapsible('toggle-metodologia-btn', 'metodologia-texto', 'Entenda o Método', 'Ocultar');
    setupCollapsible('toggle-cursos-btn', 'cursos-wrapper', 'Ver Opções e Relatos', 'Ocultar Opções');

    const slidesContainer = document.querySelector('.carousel-slides');
    if (slidesContainer) {
        const slides = document.querySelectorAll('.carousel-slide');
        const prevButton = document.querySelector('.carousel-button.prev');
        const nextButton = document.querySelector('.carousel-button.next');
        let currentIndex = 0;
        const totalSlides = slides.length;
        const updateCarousel = () => slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        nextButton.addEventListener('click', () => (currentIndex = (currentIndex + 1) % totalSlides, updateCarousel()));
        prevButton.addEventListener('click', () => (currentIndex = (currentIndex - 1 + totalSlides) % totalSlides, updateCarousel()));
        updateCarousel();
    }

    const searchInput = document.getElementById('site-search');
    const searchStatus = document.getElementById('search-status');
    const clearBtn = document.getElementById('clear-search');
    const suggestionsBox = document.getElementById('suggestions-box');
    let searchIndex = [];

    const addToIndex = (elements) => {
        elements.forEach(link => {
            const text = link.innerText || link.textContent;
            const url = link.getAttribute('href');
            if(text && url) {
                const cleanText = text.replace(/\s+/g, ' ').trim();
                const searchTerms = cleanText.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                searchIndex.push({ title: cleanText, searchString: searchTerms, url: url });
            }
        });
    };
    addToIndex(document.querySelectorAll('.accordion-panel a.exercise-link'));
    addToIndex(document.querySelectorAll('.option-card a'));

    if (searchInput && suggestionsBox) {
        const showSuggestions = (inputValue) => {
            suggestionsBox.innerHTML = '';
            if (inputValue.length < 2) return suggestionsBox.classList.remove('visible'), clearBtn.classList.remove('visible'), void(searchStatus.textContent = '');
            clearBtn.classList.add('visible');
            const inputTerms = inputValue.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ").filter(term => term.length > 0);
            const matches = searchIndex.filter(item => inputTerms.every(term => item.searchString.includes(term)));
            const resultsToShow = matches.slice(0, 8);
            if (resultsToShow.length > 0) {
                resultsToShow.forEach(match => {
                    const div = document.createElement('div');
                    div.classList.add('suggestion-item');
                    div.innerHTML = `Ir para: <strong>${match.title}</strong>`;
                    div.addEventListener('click', () => match.url.startsWith('http') ? window.open(match.url, '_blank') : window.location.href = match.url);
                    suggestionsBox.appendChild(div);
                });
                suggestionsBox.classList.add('visible');
                searchStatus.textContent = `${matches.length} resultado(s) encontrado(s).`;
            } else {
                const div = document.createElement('div');
                div.classList.add('suggestion-item');
                div.textContent = "Nenhum resultado encontrado.";
                div.style.cursor = "default";
                suggestionsBox.appendChild(div);
                suggestionsBox.classList.add('visible');
                searchStatus.textContent = "Nenhum resultado encontrado.";
            }
        };

        searchInput.addEventListener('input', (e) => showSuggestions(e.target.value));
        clearBtn.addEventListener('click', () => (searchInput.value = '', suggestionsBox.classList.remove('visible'), clearBtn.classList.remove('visible'), searchStatus.textContent = '', searchInput.focus()));
        document.addEventListener('click', (e) => e.target.closest('.input-wrapper') || suggestionsBox.classList.remove('visible'));
        
        searchInput.addEventListener('keydown', (e) => {
            let items = suggestionsBox.querySelectorAll('.suggestion-item'), currentFocus = -1;
            for(let i=0; i<items.length; i++) if(items[i].classList.contains('active')) currentFocus = i;
            const updateActive = (items, index) => (items.forEach(item => item.classList.remove('active')), items[index] && (items[index].classList.add('active'), items[index].scrollIntoView({block: 'nearest'})));

            if (e.key === 'ArrowDown') e.preventDefault(), currentFocus = (currentFocus + 1) % items.length, updateActive(items, currentFocus);
            else if (e.key === 'ArrowUp') e.preventDefault(), currentFocus = (currentFocus - 1 + items.length) % items.length, updateActive(items, currentFocus);
            else if (e.key === 'Enter') e.preventDefault(), currentFocus > -1 && items[currentFocus] && items[currentFocus].click();
        });
    }

    const setupReadingSort = () => {
        document.querySelectorAll('.sort-btn').forEach(btn => btn.replaceWith(btn.cloneNode(true)));
        document.querySelectorAll('.sort-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const currentItem = this.closest('.sortable-item'), list = currentItem.parentNode;
                if (this.classList.contains('up')) {
                    const prevItem = currentItem.previousElementSibling;
                    if (prevItem) list.insertBefore(currentItem, prevItem);
                } else if (this.classList.contains('down')) {
                    const nextItem = currentItem.nextElementSibling;
                    if (nextItem) list.insertBefore(nextItem, currentItem);
                }
            });
        });
    };
    setupReadingSort();

    const backToTopBtn = document.getElementById('back-to-top');
    if(backToTopBtn) {
        window.addEventListener('scroll', () => window.scrollY > 300 ? backToTopBtn.classList.add('visible') : backToTopBtn.classList.remove('visible'));
        backToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    const addXP = (amount) => {
        let currentXP = parseInt(localStorage.getItem('studentXP')) || 0;
        let newXP = currentXP + amount;
        localStorage.setItem('studentXP', newXP);
        const xpDisplay = document.getElementById('user-xp');
        if(xpDisplay) {
            xpDisplay.textContent = newXP;
            xpDisplay.style.color = '#fff';
            xpDisplay.style.transform = 'scale(1.2)';
            setTimeout(() => {
                xpDisplay.style.color = '#FFB81C';
                xpDisplay.style.transform = 'scale(1)';
            }, 500);
        }
    };

    const updateXPDisplay = () => {
        const xpElement = document.getElementById('user-xp');
        if(xpElement) xpElement.textContent = parseInt(localStorage.getItem('studentXP')) || 0;
    };
    updateXPDisplay();

    window.startSpeakingTest = (id) => {
        const feedbackEl = document.getElementById(`feedback-${id}`);
        const userSpeechEl = document.getElementById(`user-speech-${id}`);
        const statusEl = document.getElementById(`result-status-${id}`);
        const targetText = document.getElementById(`target-phrase-${id}`).textContent.replace(/["']/g, "").trim();
        const btn = document.querySelector(`button[onclick="startSpeakingTest(${id})"]`);
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) return alert("Desculpe, seu navegador não suporta reconhecimento de voz. Tente usar o Google Chrome no PC ou Android.");

        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.start();
        btn.classList.add('recording');
        btn.innerHTML = '🔊 Ouvindo...';
        statusEl.textContent = "";
        feedbackEl.classList.add('hidden');
        
        recognition.onresult = (event) => {
            const userTranscript = event.results[0][0].transcript;
            const cleanUser = userTranscript.toLowerCase().replace(/[.,!?]/g, "").trim();
            const cleanTarget = targetText.toLowerCase().replace(/[.,!?]/g, "").trim();
            userSpeechEl.textContent = `"${userTranscript}"`;
            feedbackEl.classList.remove('hidden');

            if (cleanUser === cleanTarget) {
                addXP(10);
                const shareLink = `https://wa.me/?text=${encodeURIComponent(`Acertei a pronúncia no site do Teacher Leo! (+10 XP)`)}`;
                statusEl.innerHTML = `<span style="color:green;">✔ Excelente! Pronúncia correta. (+10 XP)</span><br><a href="${shareLink}" target="_blank" class="share-btn" style="margin-top:10px;">Compartilhar Vitória 🚀</a>`;
                feedbackEl.className = 'feedback-text feedback-success';
            } else {
                statusEl.innerHTML = '<span style="color:red;">✖ Tente novamente.</span>';
                feedbackEl.className = 'feedback-text feedback-error';
            }
        };

        recognition.onspeechend = () => (recognition.stop(), btn.classList.remove('recording'), btn.innerHTML = '🎤 Gravar');
        recognition.onerror = () => (btn.classList.remove('recording'), btn.innerHTML = '🎤 Gravar', statusEl.textContent = "Erro ao capturar áudio. Verifique seu microfone.");
    };

    const writingSolutions = { 1: "She doesn't like chocolate." };

    window.checkWriting = (id) => {
        const userInput = document.getElementById(`write-input-${id}`).value.trim();
        const feedbackBox = document.getElementById(`write-feedback-${id}`);
        const correctAnswer = writingSolutions[id];
        const cleanInput = userInput.toLowerCase().replace(/\s+/g, ' ').replace(/[.,!?]/g, "");
        const cleanAnswer = correctAnswer.toLowerCase().replace(/\s+/g, ' ').replace(/[.,!?]/g, "");
        feedbackBox.classList.remove('hidden', 'feedback-success', 'feedback-error');

        if (cleanInput === cleanAnswer) {
            feedbackBox.classList.add('feedback-success');
            addXP(10);
            const shareLink = `https://wa.me/?text=${encodeURIComponent(`Acabei de acertar um exercício de Writing no site do Teacher Leo e ganhei XP! (+10 XP)`)}`;
            feedbackBox.innerHTML = `✔ Correto! (+10 XP) <br> Resposta: "${correctAnswer}" <br><br><a href="${shareLink}" target="_blank" class="share-btn">Compartilhar Vitória 🚀</a>`;
        } else {
            feedbackBox.classList.add('feedback-error');
            feedbackBox.innerHTML = `✖ Incorreto. <br> Sua resposta: "${userInput}" <br> Dica: Preste atenção no auxiliar da 3ª pessoa.`;
        }
    };

    window.checkReadingOrder = (id) => {
        const items = document.getElementById(`reading-list-${id}`).querySelectorAll('.sortable-item');
        const feedbackBox = document.getElementById(`reading-feedback-${id}`);
        let currentOrder = [];
        items.forEach(item => currentOrder.push(parseInt(item.getAttribute('data-order'))));

        let isCorrect = true;
        for (let i = 0; i < currentOrder.length; i++) if (currentOrder[i] !== i + 1) { isCorrect = false; break; }

        feedbackBox.classList.remove('hidden', 'feedback-success', 'feedback-error');
        if (isCorrect) {
            feedbackBox.classList.add('feedback-success');
            addXP(10);
            const shareLink = `https://wa.me/?text=${encodeURIComponent(`Organizei o texto corretamente no site do Teacher Leo! (+10 XP)`)}`;
            feedbackBox.innerHTML = `✔ Parabéns! A história está na ordem correta. (+10 XP)<br><br><a href="${shareLink}" target="_blank" class="share-btn">Compartilhar Vitória 🚀</a>`;
        } else {
            feedbackBox.classList.add('feedback-error');
            feedbackBox.textContent = "✖ A ordem ainda não está correta. Tente ler novamente a sequência lógica.";
        }
    };
});