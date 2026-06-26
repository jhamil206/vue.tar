const { createApp, ref, reactive } = Vue;

createApp({
    setup() {
        // --- ESTADO DE AUTENTICACIÓN (Tus datos originales) ---
        const estaLogueado = ref(false);
        const usuarioInput = ref('');
        const contrasenaInput = ref('');
        const errorMensaje = ref('');

        const CREDENCIALES = {
            usuario: 'felix.maldonado',
            contrasena: 'itpm2026'
        };

        // --- SIMULACIÓN DEL STORE GLOBAL DE PRODUCTOS ---
        const store = reactive({
            productos: [
                { id: 101, nombre: 'Teclado Mecánico RGB', precio: 250, stock: 12, imagen: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400' },
                { id: 102, nombre: 'Mouse Óptico Inalámbrico', precio: 110, stock: 20, imagen: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400' },
                { id: 103, nombre: 'Monitor Gamer 24\' 144Hz', precio: 1450, stock: 5, imagen: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400' }
            ],
            agregarProducto(nuevoProd) {
                const nuevoId = this.productos.length > 0 ? Math.max(...this.productos.map(p => p.id)) + 1 : 101;
                this.productos.push({ id: nuevoId, ...nuevoProd });
            }
        });

        // --- CASO PRÁCTICO 1: REQUERIMIENTOS DEL FORMULARIO ---
        // Objeto reactivo para vincular campos mediante v-model
        const formulario = reactive({
            nombre: '',
            precio: null,
            stock: null,
            imagen: ''
        });

        const alertaError = ref('');

        // Función exigida por la rúbrica: enviarFormulario()
        const enviarFormulario = () => {
            // Requerimiento d: Validar que el stock sea mayor a 0
            if (!formulario.stock || formulario.stock <= 0) {
                alertaError.value = '¡Error! El stock debe ser mayor a 0 para registrar un producto.';
                return;
            }

            // Invocar la acción del store para guardar el producto
            store.agregarProducto({
                nombre: formulario.nombre,
                precio: formulario.precio || 0,
                stock: formulario.stock,
                imagen: formulario.imagen || 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=400'
            });

            // Limpieza estricta de los campos del formulario después del registro
            formulario.nombre = '';
            formulario.precio = null;
            formulario.stock = null;
            formulario.imagen = '';
            alertaError.value = ''; 
        };

        // --- FUNCIONES DE AUTENTICACIÓN ---
        const login = () => {
            if (usuarioInput.value === CREDENCIALES.usuario && contrasenaInput.value === CREDENCIALES.contrasena) {
                estaLogueado.value = true;
                errorMensaje.value = '';
            } else {
                errorMensaje.value = 'Usuario o contraseña incorrectos.';
            }
        };

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
            store,
            formulario,
            alertaError,
            login,
            salir,
            enviarFormulario
        };
    },

    // --- INTERFAZ ADAPTADA CON EL FORMULARIO RESPONSIVO BOOTSTRAP ---
    template: `
        <div class="w-100">
            <div v-if="!estaLogueado" class="card shadow-sm border-0 mx-auto" style="max-width: 450px;">
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

            <div v-else class="card shadow border-0 mx-auto" style="max-width: 950px;">
                <div class="card-header bg-success text-white d-flex justify-content-between align-items-center py-3">
                    <h5 class="mb-0 fs-6">🚀 Panel de Control - Inventario</h5>
                    <button @click="salir" class="btn btn-danger btn-sm fw-bold px-3">Salir 🚪</button>
                </div>
                
                <div class="card-body p-4">
                    <p class="mb-3 text-secondary text-center small">Bienvenido, <b>Lic. Félix Maldonado</b>. Ajustado según requerimientos del examen:</p>
                    <hr />

                    <div class="row g-4">
                        
                        <div class="col-12 col-md-6">
                            <div class="p-3 border rounded bg-white shadow-sm">
                                <h6 class="fw-bold mb-3 text-dark">📦 Registrar Nuevo Producto</h6>
                                
                                <div v-if="alertaError" class="alert alert-danger py-2 small text-center">{{ alertaError }}</div>

                                <form @submit.prevent="enviarFormulario">
                                    <div class="mb-2">
                                        <label class="form-label small fw-bold mb-1">Nombre</label>
                                        <input type="text" v-model="formulario.nombre" class="form-control form-control-sm" required>
                                    </div>
                                    <div class="mb-2">
                                        <label class="form-label small fw-bold mb-1">Precio (Bs.)</label>
                                        <input type="number" v-model.number="formulario.precio" class="form-control form-control-sm" required>
                                    </div>
                                    <div class="mb-2">
                                        <label class="form-label small fw-bold mb-1">Stock Inicial</label>
                                        <input type="number" v-model.number="formulario.stock" class="form-control form-control-sm" required>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label small fw-bold mb-1">Enlace de Imagen (URL)</label>
                                        <input type="url" v-model="formulario.imagen" class="form-control form-control-sm" placeholder="Opcional">
                                    </div>
                                    <button type="submit" class="btn btn-primary btn-sm w-100 fw-bold">Guardar en Store</button>
                                </form>
                            </div>
                        </div>

                        <div class="col-12 col-md-6">
                            <h6 class="fw-bold mb-3 text-secondary">Existencias Actuales</h6>
                            <div class="row row-cols-1 row-cols-sm-2 g-3">
                                <div v-for="p in store.productos" :key="p.id" class="col">
                                    <div class="card h-100 shadow-sm border-0 bg-light text-center">
                                        <img :src="p.imagen" class="card-img-top" :alt="p.nombre" style="height: 110px; object-fit: cover;">
                                        <div class="card-body p-2">
                                            <h6 class="fw-bold mb-1 small text-truncate">{{ p.nombre }}</h6>
                                            <p class="text-muted mb-2" style="font-size: 0.75rem;">ID: {{ p.id }}</p>
                                            <div class="d-flex justify-content-between align-items-center">
                                                <span class="badge bg-success">Bs. {{ p.precio }}</span>
                                                <span class="text-primary small fw-bold">{{ p.stock }} pzas.</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div> </div>
            </div>
        </div>
    `
}).mount('#app');