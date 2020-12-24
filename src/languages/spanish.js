const spanish = {
  settings: {
    title: 'Ajustes',
    language: 'Idioma',
    darkMode: 'Modo Oscuro',
    contact: 'Contacto',
    saveBtn: 'Guardar',
  },
  sidebar: ['Inicio', 'Balance', 'Deudas', 'Stock'],
  header: 'Buscar',
  dashboard: {
    banner: {
      title: 'Bienvenido',
      today: 'Hoy',
      text:
        'FinPal la mejor app para administrar las finanzas de su negocio, controlar sus ingresos, gastos, deudas y stock en un solo lugar. Y poder bloquear la cuenta cuando lo necesite',
    },
    main: {
      incomes: 'Ingresos este mes',
      expenses: 'Gastos este mes',
      debts: 'Deudas',
    },
    recentMovements: 'Movimientos Recientes',
  },
  balance: {
    incomes: 'Ingresos',
    expenses: 'Gastos',
    btnText: 'Agregar Transacción',
  },
  addTransaction: {
    title: 'Añadir Transacción',
    type: 'Tipo',
    types: ['Ingreso', 'Gasto'],
    name: 'Nombre',
    description: 'Descripción',
    amount: 'Monto',
    btn: 'Añadir',
    date: 'Fecha',
  },
  editTransaction: {
    title: 'Editar Transacción',
    name: 'Nombre',
    description: 'Descripción',
    amount: 'Monto',
    btn: 'Editar',
    date: 'fecha',
  },
  authentication: {
    name: 'Nombre',
    lastName: 'Apellido',
    email: 'Email',
    password: 'Contraseña',
    repeatPassword: 'Repetir Contreseña',
    login: 'Acceder',
    signup: 'Registrarse',
    pin: 'Pin 4 dígitos (numérico)',
    errorMsg: {
      firstName: 'Nombre debe tener al menos 3 caracteres ',
      lastName: 'Apellido debe tener al menos 3 caracteres ',
      email: 'Por favor entra un email válido',
      password: 'La contraseña debe tener al menos 6 caracteres',
      password2: 'Por favor verifica que la contraseña sea la misma',
      pin: 'Por favor introduce un pin numérico de 4 dígitos ',
    },
  },
  user: {
    firstName: 'Nombre',
    lastName: 'Apellido/s',
    password: 'Contraseña',
    logOut: 'Salir',
    contact: 'Contacto',
  },
  debts: {
    debts: 'Deudas',
    amount: 'Monto',
    concept: 'Concepto',
    dueDate: 'Vencimiento',
    liqTime: 'Tiempo de liquidación',
  },
};

export default spanish;
