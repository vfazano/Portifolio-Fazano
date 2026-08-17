/* =====================================================
   PORTFÓLIO — VITOR FAZANO | script.js
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ---------- MENU MOBILE ---------- */
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    const fecharMenu = () => {
        navMenu.classList.remove('aberto');
        navToggle.classList.remove('ativo');
        navToggle.setAttribute('aria-expanded', 'false');
    };

    navToggle.addEventListener('click', () => {
        const aberto = navMenu.classList.toggle('aberto');
        navToggle.classList.toggle('ativo', aberto);
        navToggle.setAttribute('aria-expanded', String(aberto));
    });

    navMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', fecharMenu));

    /* ---------- TEMA CLARO / ESCURO ---------- */
    const themeToggle = document.getElementById('themeToggle');
    const icone = themeToggle.querySelector('i');

    const aplicarTema = tema => {
        document.documentElement.setAttribute('data-theme', tema);
        icone.className = tema === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
        localStorage.setItem('tema', tema);
    };

    aplicarTema(localStorage.getItem('tema') || 'dark');

    themeToggle.addEventListener('click', () => {
        const atual = document.documentElement.getAttribute('data-theme');
        aplicarTema(atual === 'dark' ? 'light' : 'dark');
    });

    /* ---------- HEADER + PROGRESSO + BACK TO TOP ---------- */
    const header = document.getElementById('header');
    const progresso = document.getElementById('scrollProgress');
    const backToTop = document.getElementById('backToTop');

    const aoRolar = () => {
        const y = window.scrollY;
        const total = document.documentElement.scrollHeight - window.innerHeight;
        header.classList.toggle('rolando', y > 30);
        backToTop.classList.toggle('visivel', y > 400);
        progresso.style.width = total > 0 ? `${(y / total) * 100}%` : '0%';
        marcarLinkAtivo();
    };

    window.addEventListener('scroll', aoRolar, { passive: true });

    /* ---------- LINK ATIVO NA NAVEGAÇÃO ---------- */
    const secoes = [...document.querySelectorAll('main section[id]')];
    const links = [...document.querySelectorAll('.nav-link')];

    function marcarLinkAtivo() {
        const pos = window.scrollY + 120;
        let atual = secoes[0]?.id;
        secoes.forEach(sec => {
            if (pos >= sec.offsetTop) atual = sec.id;
        });
        links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${atual}`));
    }

    /* ---------- EFEITO DE DIGITAÇÃO ---------- */
    const alvoTyping = document.getElementById('typing');
    const frases = ['Software Developer', 'Estudante de ADS', 'Front-end & Java', 'Em busca de estágio'];
    let iFrase = 0, iLetra = 0, apagando = false;

    function digitar() {
        const frase = frases[iFrase];
        alvoTyping.textContent = frase.slice(0, iLetra);

        if (!apagando && iLetra < frase.length) {
            iLetra++;
            setTimeout(digitar, 90);
        } else if (!apagando) {
            apagando = true;
            setTimeout(digitar, 1800);
        } else if (iLetra > 0) {
            iLetra--;
            setTimeout(digitar, 45);
        } else {
            apagando = false;
            iFrase = (iFrase + 1) % frases.length;
            setTimeout(digitar, 300);
        }
    }
    digitar();

    /* ---------- REVELAR AO ROLAR ---------- */
    const observador = new IntersectionObserver((entradas, obs) => {
        entradas.forEach(e => {
            if (!e.isIntersecting) return;
            e.target.classList.add('visivel');
            obs.unobserve(e.target);
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('[data-reveal]').forEach(el => observador.observe(el));

    /* ---------- BARRAS DE HABILIDADE ---------- */
    const obsSkills = new IntersectionObserver((entradas, obs) => {
        entradas.forEach(e => {
            if (!e.isIntersecting) return;
            const barra = e.target;
            barra.style.width = `${barra.dataset.level}%`;
            obs.unobserve(barra);
        });
    }, { threshold: 0.4 });

    document.querySelectorAll('.bar span').forEach(b => obsSkills.observe(b));

    /* ---------- CONTADORES ---------- */
    const obsContador = new IntersectionObserver((entradas, obs) => {
        entradas.forEach(e => {
            if (!e.isIntersecting) return;
            const el = e.target;
            const alvo = Number(el.dataset.count);
            const sufixo = el.dataset.suffix || '+';
            let atual = 0;
            const passo = Math.max(1, Math.round(alvo / 40));
            const timer = setInterval(() => {
                atual = Math.min(alvo, atual + passo);
                el.textContent = atual + sufixo;
                if (atual >= alvo) clearInterval(timer);
            }, 35);
            obs.unobserve(el);
        });
    }, { threshold: 0.6 });

    document.querySelectorAll('.stat-num').forEach(el => obsContador.observe(el));

    /* ---------- FILTRO DE PROJETOS ---------- */
    const filtros = document.querySelectorAll('.filtro');
    const cards = document.querySelectorAll('.card-projeto');

    filtros.forEach(btn => btn.addEventListener('click', () => {
        filtros.forEach(f => f.classList.remove('ativo'));
        btn.classList.add('ativo');
        const alvo = btn.dataset.filtro;
        cards.forEach(card => {
            const mostrar = alvo === 'todos' || card.dataset.cat === alvo;
            card.classList.toggle('escondido', !mostrar);
        });
    }));

    /* ---------- FORMULÁRIO DE CONTATO ---------- */
    const form = document.getElementById('contatoForm');
    const feedback = document.getElementById('formFeedback');
    const EMAIL = 'vfazano09032007@gmail.com';

    const mostrarErro = (campo, msg) => {
        campo.parentElement.querySelector('.erro').textContent = msg;
    };

    form.addEventListener('submit', ev => {
        ev.preventDefault();
        feedback.textContent = '';

        const nome = form.nome;
        const email = form.email;
        const mensagem = form.mensagem;
        let valido = true;

        [nome, email, mensagem].forEach(c => mostrarErro(c, ''));

        if (nome.value.trim().length < 2) {
            mostrarErro(nome, 'Digite seu nome.');
            valido = false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) {
            mostrarErro(email, 'Digite um e-mail válido.');
            valido = false;
        }
        if (mensagem.value.trim().length < 10) {
            mostrarErro(mensagem, 'A mensagem precisa ter ao menos 10 caracteres.');
            valido = false;
        }
        if (!valido) return;

        const assunto = encodeURIComponent(`Contato pelo portfólio — ${nome.value.trim()}`);
        const corpo = encodeURIComponent(`${mensagem.value.trim()}\n\n---\n${nome.value.trim()} (${email.value.trim()})`);
        window.location.href = `mailto:${EMAIL}?subject=${assunto}&body=${corpo}`;

        feedback.textContent = 'Abrindo seu aplicativo de e-mail...';
        form.reset();
    });

    /* ---------- ANO DO RODAPÉ ---------- */
    document.getElementById('ano').textContent = new Date().getFullYear();

    aoRolar();
});
