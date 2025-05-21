document.addEventListener('DOMContentLoaded', function() {
            // Initialiser le graphique
            initCareerChart();
            
            // Navigation sidebar
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetSection = this.getAttribute('data-section');
                    activateSection(targetSection);
                    
                    // Activer l'élément dans la sidebar
                    document.querySelectorAll('.sidebar-nav li').forEach(li => li.classList.remove('active'));
                    this.parentElement.classList.add('active');
                });
            });
            
            // Navigation par profil dans le dropdown utilisateur
            const profileLink = document.querySelector('[data-section="profile"]');
            if (profileLink) {
                profileLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    activateSection('profile');
                    
                    // Activer l'élément dans la sidebar
                    document.querySelectorAll('.sidebar-nav li').forEach(li => li.classList.remove('active'));
                    document.querySelector('.sidebar-nav [data-section="profile"]').parentElement.classList.add('active');
                    
                    // Fermer le dropdown
                    document.getElementById('user-dropdown').style.display = 'none';
                });
            }
            
            // Gestion des dropdowns
            const notifBtn = document.getElementById('notif-btn');
            const msgBtn = document.getElementById('msg-btn');
            const userBtn = document.getElementById('user-btn');
            const notifDropdown = document.getElementById('notif-dropdown');
            const msgDropdown = document.getElementById('msg-dropdown');
            const userDropdown = document.getElementById('user-dropdown');
            
            notifBtn.addEventListener('click', function(e) {
                e.preventDefault();
                toggleDropdown(notifDropdown);
                closeOtherDropdowns(notifDropdown);
            });
            
            msgBtn.addEventListener('click', function(e) {
                e.preventDefault();
                toggleDropdown(msgDropdown);
                closeOtherDropdowns(msgDropdown);
            });
            
            userBtn.addEventListener('click', function(e) {
                e.preventDefault();
                toggleDropdown(userDropdown);
                closeOtherDropdowns(userDropdown);
            });
            
            // Fermer les dropdowns quand on clique ailleurs
            document.addEventListener('click', function(e) {
                if (!e.target.closest('.header-notifications') && 
                    !e.target.closest('.header-messages') && 
                    !e.target.closest('.user-menu')) {
                    closeAllDropdowns();
                }
            });
            
            // Gestion des onglets dans le profil
            const tabLinks = document.querySelectorAll('.tabs a');
            tabLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Active l'onglet
                    tabLinks.forEach(tab => tab.parentElement.classList.remove('active'));
                    this.parentElement.classList.add('active');
                    
                    // Affiche le contenu
                    const target = this.getAttribute('href').substring(1);
                    document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
                    document.getElementById(target)?.classList.add('active');
                });
            });
            
            // Fonctions utilitaires
            
            // Activer une section du dashboard
            function activateSection(sectionId) {
                // Masquer toutes les sections
                document.querySelectorAll('.dashboard-section').forEach(section => {
                    section.classList.remove('active-section');
                });
                
                // Afficher la section cible
                const targetSection = document.getElementById(sectionId);
                if (targetSection) {
                    targetSection.classList.add('active-section');
                }
            }
            
            // Gestion des dropdowns
            function toggleDropdown(dropdown) {
                if (dropdown.style.display === 'block') {
                    dropdown.style.display = 'none';
                } else {
                    dropdown.style.display = 'block';
                }
            }
            
            function closeOtherDropdowns(currentDropdown) {
                const dropdowns = [notifDropdown, msgDropdown, userDropdown];
                dropdowns.forEach(dropdown => {
                    if (dropdown !== currentDropdown) {
                        dropdown.style.display = 'none';
                    }
                });
            }
            
            function closeAllDropdowns() {
                const dropdowns = [notifDropdown, msgDropdown, userDropdown];
                dropdowns.forEach(dropdown => {
                    if (dropdown) dropdown.style.display = 'none';
                });
            }
            
            // Fonction pour afficher un message spécifique
            function showMessage(id) {
                // Dans un projet réel, charger le message depuis le serveur
                // Pour cette démo, on simule l'affichage d'un message
                
                // Marquer le message comme lu
                document.querySelectorAll('.message-preview').forEach(preview => {
                    preview.classList.remove('message-selected');
                });
                
                const selectedMessage = document.querySelector(`.message-preview:nth-child(${id})`);
                if (selectedMessage) {
                    selectedMessage.classList.remove('unread');
                    selectedMessage.classList.add('message-selected');
                }
                
                // Afficher le message
                const messageView = document.getElementById('message-view');
                if (messageView) {
                    messageView.style.display = 'block';
                }
                
                // Mettre à jour le compteur de messages non lus
                updateUnreadCount();
            }
            
            function updateUnreadCount() {
                const unreadMessages = document.querySelectorAll('.message-preview.unread').length;
                const badge = document.querySelector('.message-badge');
                if (badge) {
                    badge.textContent = unreadMessages;
                    if (unreadMessages === 0) {
                        badge.style.display = 'none';
                    } else {
                        badge.style.display = 'flex';
                    }
                }
            }
            
            // Initialiser le graphique de carrière
            function initCareerChart() {
                const chartCanvas = document.getElementById('career-chart');
                if (!chartCanvas) return;
                
                const ctx = chartCanvas.getContext('2d');
                const chart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'],
                        datasets: [{
                            label: 'Échelon',
                            data: [1, 2, 2, 3, 4, 4, 5, 6, 6, 7, 7],
                            backgroundColor: 'rgba(0, 0, 145, 0.1)',
                            borderColor: 'rgba(0, 0, 145, 0.8)',
                            borderWidth: 2,
                            tension: 0.3,
                            fill: true
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: false
                            },
                            tooltip: {
                                backgroundColor: 'rgba(0, 0, 145, 0.8)',
                                padding: 10,
                                titleFont: {
                                    size: 14
                                },
                                bodyFont: {
                                    size: 13
                                }
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                max: 11,
                                ticks: {
                                    stepSize: 1,
                                    callback: function(value) {
                                        if (value === 0) return '';
                                        return value + (value === 1 ? 'er' : 'ème');
                                    }
                                },
                                grid: {
                                    color: 'rgba(0, 0, 0, 0.05)'
                                }
                            },
                            x: {
                                grid: {
                                    color: 'rgba(0, 0, 0, 0.05)'
                                }
                            }
                        }
                    }
                });
            }
            
            // Afficher une notification
            function showNotification(message, type = 'success') {
                const notification = document.createElement('div');
                notification.className = `notification ${type}`;
                notification.textContent = message;
                
                document.body.appendChild(notification);
                
                // Disparition automatique
                setTimeout(() => {
                    notification.classList.add('hiding');
                    setTimeout(() => {
                        document.body.removeChild(notification);
                    }, 500);
                }, 4000);
            }
            
            // Afficher une notification de bienvenue au chargement
            setTimeout(() => {
                showNotification('Bienvenue sur votre espace I-Prof, Ponche Maxence!');
            }, 1000);
            
            // Bouton déconnexion
            const logoutBtn = document.getElementById('logout-btn');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', function(e) {
                    // La redirection vers index.html est gérée par le lien href
                    showNotification('Déconnexion réussie. Au revoir!');
                });
            }
        });