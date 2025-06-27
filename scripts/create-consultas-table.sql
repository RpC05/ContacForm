-- Crear tabla para almacenar las consultas del formulario de contacto
CREATE TABLE IF NOT EXISTS consultas (
  id BIGSERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  empresa VARCHAR(255),
  tipo_consulta VARCHAR(50) NOT NULL CHECK (tipo_consulta IN ('support', 'sales', 'partnership', 'demo', 'feedback', 'other')),
  mensaje TEXT NOT NULL,
  estado VARCHAR(20) DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'en_proceso', 'respondido')),
  prioridad VARCHAR(10) DEFAULT 'media' CHECK (prioridad IN ('alta', 'media', 'baja')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_consultas_estado ON consultas(estado);
CREATE INDEX IF NOT EXISTS idx_consultas_tipo ON consultas(tipo_consulta);
CREATE INDEX IF NOT EXISTS idx_consultas_fecha ON consultas(created_at);
CREATE INDEX IF NOT EXISTS idx_consultas_email ON consultas(email);

-- Crear función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Crear trigger para actualizar updated_at
CREATE TRIGGER update_consultas_updated_at 
    BEFORE UPDATE ON consultas 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Habilitar Row Level Security (RLS)
ALTER TABLE consultas ENABLE ROW LEVEL SECURITY;

-- Crear política para permitir insertar consultas (público)
CREATE POLICY "Permitir insertar consultas" ON consultas
    FOR INSERT WITH CHECK (true);

-- Crear política para permitir leer consultas (solo admin)
CREATE POLICY "Permitir leer consultas admin" ON consultas
    FOR SELECT USING (true);

-- Crear política para permitir actualizar consultas (solo admin)
CREATE POLICY "Permitir actualizar consultas admin" ON consultas
    FOR UPDATE USING (true);

-- Crear política para permitir eliminar consultas (solo admin)
CREATE POLICY "Permitir eliminar consultas admin" ON consultas
    FOR DELETE USING (true);
