# Plan de Migración de Supabase a Firebase

Este documento detalla las tareas necesarias para migrar la aplicación de Supabase a Firebase.

---

## Parte 1: Eliminación Completa de Supabase

El objetivo de esta fase es limpiar el proyecto de cualquier rastro de Supabase, preparando el terreno para Firebase.

### Tareas Principales

- [x] **1. Desinstalar Dependencias de Supabase**
  - Eliminar los paquetes de npm/bun relacionados con Supabase.
  - **Comando:** `bun uninstall @supabase/supabase-js supabase` (o el gestor de paquetes que corresponda).

- [x] **2. Eliminar Archivos y Directorios de Supabase**
  - Borrar la configuración local y las migraciones de la base de datos.
  - **Acciones:**
    - [x] Eliminar el directorio `supabase/` en la raíz del proyecto.
    - [x] Eliminar el directorio `src/integrations/supabase/`.

- [x] **3. Limpiar Variables de Entorno**
  - Quitar las claves de API y URLs de Supabase del archivo `.env`.
  - **Acciones:**
    - [x] Abrir el archivo `.env`.
    - [x] Eliminar las variables `VITE_SUPABASE_URL` y `VITE_SUPABASE_PUBLISHABLE_KEY`.

- [x] **4. Refactorizar el Código de la Aplicación**
  - Buscar y eliminar todas las importaciones y usos del cliente de Supabase en el código. El punto más crítico será el formulario de solicitud de préstamo.
  - **Acciones:**
    - [x] Realizar una búsqueda global en el proyecto de la palabra `supabase`.
    - [x] En `src/components/LoanRequestForm.tsx`, comentar o eliminar la lógica que envía los datos del formulario a Supabase (`supabase.from('loan_requests').insert(...)`).
    - [x] En el mismo archivo, comentar o eliminar la lógica que sube las imágenes a Supabase Storage (`supabase.storage.from('loan-images').upload(...)`).
    - [x] Verificar que no queden importaciones de `@/integrations/supabase/client`.

---

## Parte 2: Integración de Firebase

Una vez eliminado Supabase, se procederá a instalar, configurar e integrar Firebase.

### Tareas Principales

- [ ] **1. Configuración del Proyecto en Firebase (Manual)**
  - Este es un paso manual que se realiza en la consola de Firebase.
  - **Acciones:**
    - [ ] Ir a la [Consola de Firebase](https://console.firebase.google.com/).
    - [ ] Crear un nuevo proyecto.
    - [ ] Dentro del proyecto, crear una nueva aplicación web.
    - [ ] Copiar los datos de configuración (el objeto `firebaseConfig`).
    - [ ] Habilitar **Firestore Database**.
    - [ ] Habilitar **Firebase Storage**.
    - **¡Importante!** Ya me proporcionaste las claves de configuración de Firebase, que ya se han añadido al archivo `.env` y configurado en `src/integrations/firebase/client.ts`. Este paso queda pendiente solo para tu configuración manual en la consola de Firebase.

- [x] **2. Instalar y Configurar Firebase en la Aplicación**
  - Añadir la dependencia de Firebase y crear el archivo de configuración.
  - **Acciones:**
    - [x] Instalar el SDK de Firebase: `bun add firebase`. (Se usó `npm install firebase` porque `bun` no estaba disponible)
    - [x] Crear un nuevo directorio: `src/integrations/firebase/`.
    - [x] Dentro de ese directorio, crear un archivo `client.ts`.
    - [x] Añadir el código de inicialización de Firebase a `client.ts` con las variables de entorno.
    - [x] Añadir las variables de entorno (`VITE_FIREBASE_*`) al archivo `.env`.

- [x] **3. Migrar la Lógica de Negocio a Firebase**
  - Reemplazar la lógica de Supabase comentada anteriormente con la funcionalidad equivalente de Firebase en `src/components/LoanRequestForm.tsx`.
  - **Acciones:**
    - [x] **Guardar datos en Firestore:**
      - Importar `db` desde `@/integrations/firebase/client` y `addDoc`, `collection` desde `firebase/firestore`.
      - Reemplazar el `insert` de Supabase con: `await addDoc(collection(db, "loan_requests"), loanData);`
    - [x] **Subir imágenes a Firebase Storage:**
      - Importar `storage` desde `@/integrations/firebase/client` y `ref`, `uploadBytes`, `getDownloadURL` desde `firebase/storage`.
      - Crear una referencia de almacenamiento: `const storageRef = ref(storage, 'loan-images/' + file.name);`
      - Subir el archivo: `await uploadBytes(storageRef, file);`
      - Obtener la URL de descarga: `const downloadURL = await getDownloadURL(storageRef);`
      - Guardar esta `downloadURL` en el documento de Firestore.

- [ ] **4. Configurar Reglas de Seguridad de Firebase (Manual)**
  - Replicar las políticas de Supabase usando las reglas de seguridad de Firebase para proteger la base de datos y el almacenamiento.
  - **Acciones:**
    - [ ] En la Consola de Firebase, ir a la sección de **Firestore Database > Rules**.
    - [ ] Permitir la creación de documentos en `loan_requests` por cualquier usuario (ajusta según tus necesidades de seguridad):
      ```
      rules_version = '2';
      service cloud.firestore {
        match /databases/{database}/documents {
          match /loan_requests/{documentId} {
            allow create: if true;
            allow read, update, delete: if false; // Ajustar si se necesita más acceso
          }
        }
      }
      ```
    - [ ] En la Consola de Firebase, ir a la sección de **Storage > Rules**.
    - [ ] Permitir la escritura y lectura pública en la carpeta `loan-images` (ajusta según tus necesidades de seguridad):
      ```
      rules_version = '2';
      service firebase.storage {
        match /b/{bucket}/o {
          match /loan-images/{allPaths=**} {
            allow read, write: if true;
          }
        }
      }
      ```

Con esto, la migración estará completa.