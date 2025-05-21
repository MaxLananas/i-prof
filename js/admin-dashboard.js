document.addEventListener('DOMContentLoaded', function() {
            // User dropdown
            const userDropdownBtn = document.getElementById('user-dropdown-btn');
            const userDropdown = document.getElementById('user-dropdown');
            
            userDropdownBtn.addEventListener('click', function() {
                userDropdown.classList.toggle('show');
            });
            
            // Fermer le dropdown si on clique ailleurs
            document.addEventListener('click', function(event) {
                if (!userDropdownBtn.contains(event.target) && !userDropdown.contains(event.target)) {
                    userDropdown.classList.remove('show');
                }
            });
            
            // Navigation sidebar
            const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
            
            sidebarLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Supprimer la classe active de tous les liens
                    sidebarLinks.forEach(l => l.classList.remove('active'));
                    
                    // Ajouter la classe active au lien cliqué
                    this.classList.add('active');
                    
                    // Afficher la section correspondante
                    const section = this.getAttribute('data-section');
                    showSection(section);
                });
            });
            
            // Fonction pour afficher une section
            function showSection(sectionName) {
                // Masquer toutes les sections
                document.querySelectorAll('.content-section').forEach(section => {
                    section.style.display = 'none';
                });
                
                // Afficher la section demandée
                const sectionToShow = document.getElementById(sectionName + '-section');
                if (sectionToShow) {
                    sectionToShow.style.display = 'block';
                }
            }
            
            // Graphiques
            const usersChartCtx = document.getElementById('users-chart').getContext('2d');
            const usersChart = new Chart(usersChartCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'],
                    datasets: [{
                        label: 'Connexions',
                        data: [6500, 5900, 8000, 8100, 9600, 7800, 5400, 4000, 7500, 8500, 9100, 9800],
                        borderColor: '#000091',
                        backgroundColor: 'rgba(0, 0, 145, 0.1)',
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
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                drawBorder: false,
                                color: 'rgba(0, 0, 0, 0.05)'
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    }
                }
            });
            
            const academiesChartCtx = document.getElementById('academies-chart').getContext('2d');
            const academiesChart = new Chart(academiesChartCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Paris', 'Versailles', 'Créteil', 'Lyon', 'Lille', 'Autres'],
                    datasets: [{
                        data: [15, 12, 10, 8, 7, 48],
                        backgroundColor: [
                            '#000091',
                            '#1414a0',
                            '#2929b0',
                            '#3d3dc0',
                            '#5252d0',
                            '#e8e8f8'
                        ],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'right'
                        }
                    },
                    cutout: '70%'
                }
            });
            
            // Gestion des modales
            function openModal(modalId) {
                const modal = document.getElementById(modalId);
                modal.classList.add('show');
            }
            
            function closeModal(modalId) {
                const modal = document.getElementById(modalId);
                modal.classList.remove('show');
            }
            
            // Fermer les modales quand on clique sur la croix ou sur le bouton Annuler
            document.querySelectorAll('.modal-close, #cancel-add-user, #cancel-edit-user, #cancel-delete-user').forEach(element => {
                element.addEventListener('click', function() {
                    const modal = this.closest('.modal');
                    modal.classList.remove('show');
                });
            });
            
            // Fermer la modale quand on clique en dehors
            document.querySelectorAll('.modal').forEach(modal => {
                modal.addEventListener('click', function(event) {
                    if (event.target === this) {
                        this.classList.remove('show');
                    }
                });
            });
            
            // Ouvrir la modale d'ajout d'utilisateur
            document.getElementById('add-user-btn').addEventListener('click', function() {
                openModal('add-user-modal');
            });
            
            // Ouvrir la modale de modification d'utilisateur
            document.querySelectorAll('.edit-user').forEach(button => {
                button.addEventListener('click', function() {
                    const userId = this.getAttribute('data-id');
                    
                    // Dans un vrai système, on chargerait les données de l'utilisateur depuis le serveur
                    // Pour cet exemple, on va simuler avec des données statiques
                    
                    // Pré-remplir le formulaire
                    document.getElementById('edit-user-id').value = userId;
                    
                    // Simuler le chargement des données utilisateur
                    let userData;
                    
                    if (userId === 'U-10021') {
                        userData = {
                            firstname: 'Sophie',
                            lastname: 'Martin',
                            email: 'sophie.martin@ac-versailles.fr',
                            academy: 'versailles',
                            role: 'enseignant',
                            status: 'active',
                            numen: '12AB34CD56EF'
                        };
                    } else if (userId === 'U-10022') {
                        userData = {
                            firstname: 'Jean',
                            lastname: 'Dubois',
                            email: 'jean.dubois@ac-paris.fr',
                            academy: 'paris',
                            role: 'enseignant',
                            status: 'active',
                            numen: '23BC45DE67FG'
                        };
                    } else if (userId === 'U-10023') {
                        userData = {
                            firstname: 'Emma',
                            lastname: 'Leroy',
                            email: 'emma.leroy@ac-lyon.fr',
                            academy: 'lyon',
                            role: 'gestionnaire',
                            status: 'active',
                            numen: '34CD56EF78GH'
                        };
                    } else if (userId === 'U-10024') {
                        userData = {
                            firstname: 'Thomas',
                            lastname: 'Garcia',
                            email: 'thomas.garcia@ac-bordeaux.fr',
                            academy: 'bordeaux',
                            role: 'enseignant',
                            status: 'pending',
                            numen: '45DE67FG89HI'
                        };
                    } else {
                        userData = {
                            firstname: 'Marie',
                            lastname: 'Bernard',
                            email: 'marie.bernard@ac-lille.fr',
                            academy: 'lille',
                            role: 'enseignant',
                            status: 'inactive',
                            numen: '56EF78GH90IJ'
                        };
                    }
                    
                    // Remplir le formulaire
                    document.getElementById('edit-user-firstname').value = userData.firstname;
                    document.getElementById('edit-user-lastname').value = userData.lastname;
                    document.getElementById('edit-user-email').value = userData.email;
                    document.getElementById('edit-user-academy').value = userData.academy;
                    document.getElementById('edit-user-role').value = userData.role;
                    document.getElementById('edit-user-status').value = userData.status;
                    document.getElementById('edit-user-numen').value = userData.numen;
                    
                    // Ouvrir la modale
                    openModal('edit-user-modal');
                });
            });
            
            // Ouvrir la modale de suppression d'utilisateur
            document.querySelectorAll('.delete-user').forEach(button => {
                button.addEventListener('click', function() {
                    const userId = this.getAttribute('data-id');
                    
                    // Afficher l'ID de l'utilisateur à supprimer
                    document.getElementById('delete-user-id').textContent = userId;
                    
                    // Ouvrir la modale
                    openModal('delete-user-modal');
                });
            });
            
            // Gérer la soumission du formulaire d'ajout d'utilisateur
            document.getElementById('confirm-add-user').addEventListener('click', function() {
                const form = document.getElementById('add-user-form');
                
                // Vérifier si tous les champs obligatoires sont remplis
                const requiredFields = form.querySelectorAll('[required]');
                let valid = true;
                
                requiredFields.forEach(field => {
                    if (!field.value) {
                        field.style.border = '1px solid red';
                        valid = false;
                    } else {
                        field.style.border = '1px solid var(--border-color)';
                    }
                });
                
                // Vérifier si les mots de passe correspondent
                const password = document.getElementById('user-password').value;
                const confirmPassword = document.getElementById('user-password-confirm').value;
                
                if (password !== confirmPassword) {
                    document.getElementById('user-password-confirm').style.border = '1px solid red';
                    alert('Les mots de passe ne correspondent pas.');
                    return;
                }
                
                if (valid) {
                    // Dans un vrai système, on enverrait les données au serveur
                    // Pour cet exemple, on va simplement fermer la modale et afficher un message
                    
                    closeModal('add-user-modal');
                    
                    // Affichage d'un message de confirmation (dans un vrai système, on utiliserait un système de notification)
                    alert('Utilisateur ajouté avec succès !');
                    
                    // Réinitialiser le formulaire
                    form.reset();
                } else {
                    alert('Veuillez remplir tous les champs obligatoires.');
                }
            });
            
            // Gérer la soumission du formulaire de modification d'utilisateur
            document.getElementById('confirm-edit-user').addEventListener('click', function() {
                const form = document.getElementById('edit-user-form');
                
                // Vérifier si tous les champs obligatoires sont remplis
                const requiredFields = form.querySelectorAll('[required]');
                let valid = true;
                
                requiredFields.forEach(field => {
                    if (!field.value) {
                        field.style.border = '1px solid red';
                        valid = false;
                    } else {
                        field.style.border = '1px solid var(--border-color)';
                    }
                });
                
                if (valid) {
                    // Dans un vrai système, on enverrait les données au serveur
                    // Pour cet exemple, on va simplement fermer la modale et afficher un message
                    
                    closeModal('edit-user-modal');
                    
                    // Affichage d'un message de confirmation (dans un vrai système, on utiliserait un système de notification)
                    alert('Utilisateur modifié avec succès !');
                }
            });
            
            // Gérer la suppression d'utilisateur
            document.getElementById('confirm-delete-user').addEventListener('click', function() {
                // Dans un vrai système, on enverrait une requête au serveur pour supprimer l'utilisateur
                // Pour cet exemple, on va simplement fermer la modale et afficher un message
                
                closeModal('delete-user-modal');
                
                // Affichage d'un message de confirmation (dans un vrai système, on utiliserait un système de notification)
                alert('Utilisateur supprimé avec succès !');
            });
        });