const { createApp, ref } = Vue;

createApp({
    setup() {
        // Estado de autenticación
        const estaLogueado = ref(false);
        
        // Modelos para los inputs del formulario
        const usuarioInput = ref('');
        const contrasenaInput = ref('');
        const errorMensaje = ref('');

        // Credenciales correctas
        const CREDENCIALES = {
            usuario: 'felix.maldonado',
            contrasena: 'itpm2026'
        };

        // 1. ACTUALIZACIÓN DE DATOS: Añadimos URLs de imágenes reales para el ejercicio
        const listaProductos = ref([
            { 
                id: 101, 
                nombre: 'Teclado Mecánico RGB', 
                precio: 250, 
                stock: 12, 
                imagen: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400&auto=format&fit=crop&q=60' 
            },
            { 
                id: 102, 
                nombre: 'Mouse Óptico Inalámbrico', 
                precio: 110, 
                stock: 20, 
                imagen: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400&auto=format&fit=crop&q=60' 
            },
            { 
                id: 103, 
                nombre: 'Monitor Gamer 24\' 144Hz', 
                precio: 1450, 
                stock: 5, 
                imagen: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&auto=format&fit=crop&q=60' 
            }
        ]);

        // Función para validar las credenciales
        const login = () => {
            if (usuarioInput.value === CREDENCIALES.usuario && contrasenaInput.value === CREDENCIALES.contrasena) {
                estaLogueado.value = true;
                errorMensaje.value = '';
            } else {
                errorMensaje.value = 'Usuario o contraseña incorrectos.';
            }
        };

        // Función para salir del panel
        const salir = () => {
            estaLogueado.value = false;
            usuarioInput.value = '';
            contrasenaInput.value = '';
        };

        return {
            estaLogueado,
            usuarioInput,
            contrasenaInput,
            errorMensaje,
            listaProductos,
            login,
            salir
        };
    },
    // 2. ACTUALIZACIÓN DEL TEMPLATE: Cambiamos la lista por la cuadrícula de tarjetas (Cards)
    template: `
        <div>
            <div v-if="!estaLogueado" class="card shadow-sm border-0">
                <div class="card-header bg-dark text-white text-center py-3">
                    <h5 class="mb-0">🔒 Sistema de Gestión - ITPM</h5>
                </div>
                <div class="card-body p-4">
                    <div v-if="errorMensaje" class="alert alert-danger text-center py-2 small">{{ errorMensaje }}</div>
                    
                    <form @submit.prevent="login">
                        <div class="mb-3">
                            <label class="form-label small fw-bold text-secondary">Usuario Docente</label>
                            <input type="text" v-model="usuarioInput" class="form-control" placeholder="Ej: felix.maldonado" required>
                        </div>
                        <div class="mb-4">
                            <label class="form-label small fw-bold text-secondary">Contraseña</label>
                            <input type="password" v-model="contrasenaInput" class="form-control" placeholder="••••••••" required>
                        </div>
                        <button type="submit" class="btn btn-primary w-100 fw-bold">Ingresar al Sistema</button>
                    </form>
                </div>
            </div>

            <div v-else class="card shadow border-0" style="max-width: 800px; margin: 0 auto;">
                <div class="card-header bg-success text-white d-flex justify-content-between align-items-center py-3">
                    <h5 class="mb-0 fs-6">🚀 Almacén Activo</h5>
                    <button @click="salir" class="btn btn-danger btn-sm fw-bold px-3">Salir 🚪</button>
                </div>
                
                <div class="card-body p-4 text-center">
                    <p class="mb-1 text-secondary small">Bienvenido, <b>Lic. Félix Maldonado</b>. Inventario verificado por TypeScript:</p>
                    <hr />

                    <div class="row row-cols-1 row-cols-md-3 g-4 mt-2">
                        <div v-for="p in listaProductos" :key="p.id" class="col">
                            <div class="card h-100 shadow-sm border-0 bg-light text-center">
                                <img :src="p.imagen" class="card-img-top" :alt="p.nombre" style="height: 150px; object-fit: cover;">
                                
                                <div class="card-body p-3">
                                    <h6 class="card-title fw-bold mb-1">{{ p.nombre }}</h6>
                                    <p class="card-text text-muted small mb-2">ID: {{ p.id }}</p>
                                    
                                    <div class="d-flex justify-content-between align-items-center">
                                        <span class="badge bg-success">Bs. {{ p.precio }}</span>
                                        <span class="text-primary small fw-bold">{{ p.stock }} pzas.</span>
                                    </div>
                                </div>
                                
                                <div class="card-footer bg-white border-0 p-2">
                                    <button class="btn btn-outline-dark btn-sm w-100">Gestionar Stock</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
            </div>
        </div>
    `
}).mount('#app');