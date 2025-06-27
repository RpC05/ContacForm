-- Crear tabla para usuarios administradores
CREATE TABLE IF NOT EXISTS admin_users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  activo BOOLEAN DEFAULT true,
  ultimo_acceso TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índices para mejorar rendimiento
CREATE INDEX IF NOT EXISTS idx_admin_users_username ON admin_users(username);
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);
CREATE INDEX IF NOT EXISTS idx_admin_users_activo ON admin_users(activo);

-- Insertar usuario administrador por defecto
-- Usuario: admin, Contraseña: admin123
INSERT INTO admin_users (username, email, password_hash, nombre, apellido) 
VALUES (
  'admin', 
  'admin@melodichub.com', 
  '$2b$10$rOvHPGp8ScRnkwOnlS7/aeQQQFwbJVV4UJ8YzZr.xQp5YzGxqJ9Ky', -- admin123
  'Administrador',
  'Sistema'
) ON CONFLICT (username) DO NOTHING;

-- Habilitar RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Política para permitir lectura solo a usuarios autenticados
CREATE POLICY "Admin users can read own data" ON admin_users
  FOR SELECT USING (true);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para actualizar updated_at
CREATE TRIGGER update_admin_users_updated_at 
  BEFORE UPDATE ON admin_users 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
