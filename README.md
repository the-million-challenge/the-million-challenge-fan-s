# The Million Challenge Fans - Código listo para móvil (Spanish)

Este repositorio contiene una versión front-end y Firebase-ready de "The Million Challenge Fans". Está pensada para poder guardarse directamente desde un celular Android (copiar y pegar cada archivo en el editor de tu elección) y subirse a GitHub desde la app móvil de GitHub o desde la interfaz web móvil.

IMPORTANTE: Este proyecto incluye funcionalidades demo y ejemplos de integración con Stripe. Para una solución en producción necesitarás configurar webhooks y código server-side (p. ej. Cloud Functions) para validar pagos, gestionar cobros y cumplir con normas bancarias y legales.

Contenido del repositorio:
- `index.html` — Interfaz principal (landing, registro, login, perfiles, compra de coronas demo).
- `style.css` — Estilos en negro y dorado, responsivos.
- `app.js` — Lógica principal: Firebase Auth, Firestore, Storage, subida de contenido, compra demo, export CSV.
- `firebase-config.js` — Lugar para pegar tu configuración de Firebase (credenciales públicas).
- `admin-panel.html` — Panel administrativo (archivo separado — manual).
- `README.md` — Este documento y guía de despliegue.

COPYRIGHT LEGAL (tal como solicitado)
> Todo el contenido, diseño, estructura, lógica, nombre comercial, y concepto de "The Million Challenge Fans" está protegido por derechos de autor bajo las leyes internacionales de propiedad intelectual.  
> Queda estrictamente prohibido copiar, reproducir, distribuir, modificar, adaptar o utilizar cualquier parte de este proyecto sin autorización expresa y por escrito del titular.  
> Este proyecto está registrado como obra original y única. Cualquier intento de plagio, clonación o uso indebido será perseguido legalmente bajo las leyes aplicables en México, Estados Unidos y tratados internacionales como el Convenio de Berna.  
> Todos los derechos reservados.

## Requisitos mínimos (para usar desde móvil)
1. Cuenta en Firebase (https://console.firebase.google.com)  
2. Habilitar en Firebase:
   - Authentication → Sign-in method → Email/Password
   - Firestore Database (modo de prueba para desarrollo; configurar reglas en producción)
   - Storage
3. (Opcional para pagos reales) Cuenta en Stripe y creación de Payment Links o configuración de un backend para Checkout/Webhooks.

## Configuración (pasos desde el móvil)
1. Crea un nuevo proyecto en Firebase.
2. En la consola del proyecto ve a "Project settings" y copia la configuración de Firebase (apiKey, authDomain, etc.). Pega esos valores en `firebase-config.js`.
3. Opcional: en Stripe crea Payment Links y pega URLs en `stripePaymentLinks` dentro de `firebase-config.js` (map por cantidad).
   - Ejemplo:
     ```
     const stripePaymentLinks = {
       "1": "https://buy.stripe.com/test_XXXXXXXX",
       "5": "https://buy.stripe.com/test_YYYYYYYY"
     };
     ```
4. Guarda todos los archivos en tu móvil y súbelos a tu repositorio GitHub (puedes crear los archivos directamente en la app GitHub o usar un editor de texto y luego "Upload files").

## Flujos importantes
- Registro de fans: inmediato, pueden comprar coronas desde la interfaz demo.
- Registro de creadores: se crea usuario y registro en `creators_pending`. El administrador debe autorizar desde `admin-panel.html`.
- Límite de 500 creadores activos: si el número de creadores activos es >=500, nuevos creadores quedan en `waiting_list`.
- Subida de contenido: los creadores autorizados pueden subir fotos/videos (almacenados en Firebase Storage y referenciados en Firestore).
- Sistema de coronas:
  - Precio por corona: $1.50 USD. (En demo se calcula localmente.)
  - Distribución: $1.00 para el creador, $0.50 para la plataforma.
  - Transacciones se guardan en la colección `transactions`.
  - Cuando un creador alcanzara 1,000,000 de coronas, habrá que implementar un proceso manual/automático de pago (no incluido).
- Retiro anticipado:
  - Si un creador solicita retirada antes de 1,000,000 coronas, se aplica una penalización del 50% sobre las coronas acumuladas (lógica ilustrativa en `app.js`).
  - El retiro crea un documento en `withdrawals` para que el admin procese.

## Seguridad y producción
- En desarrollo puedes usar reglas de Firestore abiertas, pero en producción debes:
  - Restringir escrituras a colecciones sensibles.
  - No confiar en redirecciones de Stripe para acreditar pagos: usa webhooks seguros en un servidor o Firebase Cloud Functions para verificar el pago y actualizar Firestore.
  - No almacenes información bancaria completa. Usa proveedores como Stripe Connect para manejar onboarding y pagos.
  - Implementa verificación de identidad para creadores (KYC) si vas a pagarles dinero real.
  - Revisa requerimientos legales en tus jurisdicciones (protección de datos, edades, impuestos).

## Admin panel (breve)
- `admin-panel.html` provee herramientas para:
  - Autorizar/rechazar creadores (mover de `creators_pending` a usuarios con `status: active`).
  - Ver estadísticas (coronas totales).
  - Eliminar contenido inapropiado.
  - Exportar datos a CSV (client-side).
- Para identificar administradores puedes:
  - Marcar manualmente un campo `isAdmin: true` en tu documento de usuario en Firestore,
  - O mantener una lista de UIDs de admin en `settings/admins`.

## Limitaciones y recomendaciones
- Pago real: configurar Stripe con backend (o Firebase Cloud Functions) para crear Checkout Sessions y recibir webhooks que verifiquen y registren transacciones.
- Payouts a creadores: usar Stripe Connect para transferencias y onboarding bancario.
- Manejo de contenido sensible: añadir flujo de moderación y reportes, y cumplir con leyes aplicables.
- Escalabilidad: utiliza indices de Firestore, límites de lectura y paginación.

---

Si quieres, puedo:
- Proveer el archivo `admin-panel.html` completo (listo para móvil) con funciones de autorizar/rechazar y export CSV.
- Añadir un ejemplo de reglas de seguridad de Firestore recomendadas para producción.
- Explicar paso a paso cómo crear Payment Links en Stripe y cómo integrarlos con este frontend sin servidor (solo para flujo simple), o cómo crear Cloud Functions para validar pagos.

¿Quieres que añada ahora el `admin-panel.html` listo para usar desde el móvil?