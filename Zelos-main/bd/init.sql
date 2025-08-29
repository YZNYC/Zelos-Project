 DROP DATABASE zelo;
    CREATE DATABASE zelo;
    USE zelo;
    
    -- Criação da tabela `usuarios`
    CREATE TABLE usuarios (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        numeroUsuario VARCHAR(255) NOT NULL UNIQUE,
        funcao ENUM ('admin','tecnico','usuario') DEFAULT 'usuario',
        status ENUM('ativo', 'inativo') DEFAULT 'ativo',
        criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
    
    -- Criação da tabela `pool` usada para os chamados
    CREATE TABLE pool (
        id INT AUTO_INCREMENT PRIMARY KEY,
        titulo ENUM('manutencao', 'apoio_tecnico', 'limpeza') NOT NULL,
        descricao TEXT,
        status ENUM('ativo', 'inativo') DEFAULT 'ativo',
        criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        created_by INT,
        updated_by INT,
        FOREIGN KEY (created_by) REFERENCES usuarios(id),
        FOREIGN KEY (updated_by) REFERENCES usuarios(id)
    );

    -- Criação da tabela `chamados` associando
    CREATE TABLE chamados (
        id INT AUTO_INCREMENT PRIMARY KEY,
        titulo VARCHAR(255) NOT NULL,
        descricao TEXT NOT NULL,
        tipo_id INT,
        tecnico_id INT,
        usuario_id INT,
        status ENUM('pendente', 'em andamento', 'concluido') DEFAULT 'pendente',
        criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (tipo_id) REFERENCES pool(id),
        FOREIGN KEY (tecnico_id) REFERENCES usuarios(id),
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    );

    -- Criação da tabela `apontamentos`
    CREATE TABLE apontamentos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        chamado_id INT,
        tecnico_id INT,
        descricao TEXT,
        comeco DATETIME NOT NULL,
        fim DATETIME NOT NULL,
        duracao INT AS (TIMESTAMPDIFF(SECOND, comeco, fim)) STORED, -- Calcula a duração em segundos
        criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (chamado_id) REFERENCES chamados(id),	
        FOREIGN KEY (tecnico_id) REFERENCES usuarios(id)
    );

    -- Criação da tabela `pool_tecnico`
    CREATE TABLE pool_tecnico (
        id INT AUTO_INCREMENT PRIMARY KEY,
        id_pool INT,
        id_tecnico INT,
        FOREIGN KEY (id_pool) REFERENCES pool(id),
        FOREIGN KEY (id_tecnico) REFERENCES usuarios(id)
    );

    -- Índices adicionais para otimização
    CREATE INDEX idx_usuarios_numero ON usuarios(numeroUsuario);
    CREATE INDEX idx_chamados_status ON chamados(status);
    CREATE INDEX idx_apontamentos_comeco_fim ON apontamentos(comeco, fim);
    
    SELECT * FROM usuarios;


-- ============================
-- Inserindo usuários
-- ============================
INSERT INTO usuarios (nome, numeroUsuario, funcao) VALUES
('Admin 1', 'admin1', 'admin'),
('Tecnico 1', 'tec1', 'tecnico'),
('Tecnico 2', 'tec2', 'tecnico'),
('Usuario 1', 'usu1', 'usuario'),
('Usuario 2', 'usu2', 'usuario'),
('Usuario 3', 'usu3', 'usuario');

-- ============================
-- Popula a tabela pool (tipos de chamados)
-- ============================
INSERT INTO pool (titulo, descricao, status, created_by, updated_by) VALUES
('manutencao', 'Manutenção predial', 'ativo', 1, 1),
('limpeza', 'Limpeza pesada', 'ativo', 1, 1),
('apoio_tecnico', 'Suporte remoto', 'ativo', 1, 1),
('externo', 'Consultoria externa', 'ativo', 1, 1);

-- ============================
-- 16/08 - 3 chamados (dia leve)
-- ============================
INSERT INTO chamados (titulo, descricao, tipo_id, tecnico_id, usuario_id, status, criado_em) VALUES
('Chamado 16-08 L1', 'Limpeza rotina', 2, 2, 4, 'pendente', '2025-08-16 08:05:00'),
('Chamado 16-08 AT1', 'Suporte remoto', 3, 3, 5, 'em andamento', '2025-08-16 09:30:00'),
('Chamado 16-08 M1', 'Manutenção predial', 1, 2, 6, 'concluido', '2025-08-16 11:15:00');

-- ============================
-- 17/08 - 12 chamados (dia pesado)
-- ============================
INSERT INTO chamados (titulo, descricao, tipo_id, tecnico_id, usuario_id, status, criado_em) VALUES
('Chamado 17-08 M1', 'Manutenção elétrica', 1, 2, 4, 'pendente', '2025-08-17 07:50:00'),
('Chamado 17-08 L1', 'Limpeza pesada', 2, 2, 5, 'em andamento', '2025-08-17 08:20:00'),
('Chamado 17-08 AT1', 'Suporte remoto', 3, 3, 6, 'concluido', '2025-08-17 08:45:00'),
('Chamado 17-08 M2', 'Revisão hidráulica', 1, 2, 6, 'pendente', '2025-08-17 09:15:00'),
('Chamado 17-08 L2', 'Limpeza pós-obra', 2, 2, 4, 'em andamento', '2025-08-17 09:50:00'),
('Chamado 17-08 AT2', 'Configuração de sistema', 3, 3, 5, 'em andamento', '2025-08-17 10:30:00'),
('Chamado 17-08 E1', 'Consultoria externa', 4, 3, 4, 'pendente', '2025-08-17 11:05:00'),
('Chamado 17-08 L3', 'Limpeza rotina', 2, 2, 6, 'pendente', '2025-08-17 11:45:00'),
('Chamado 17-08 M3', 'Manutenção predial', 1, 2, 5, 'em andamento', '2025-08-17 12:10:00'),
('Chamado 17-08 AT3', 'Suporte remoto', 3, 3, 4, 'concluido', '2025-08-17 12:40:00'),
('Chamado 17-08 L4', 'Limpeza pesada', 2, 2, 6, 'em andamento', '2025-08-17 13:15:00'),
('Chamado 17-08 E2', 'Consultoria externa', 4, 3, 5, 'pendente', '2025-08-17 14:00:00');

-- ============================
-- 18/08 - 2 chamados (dia muito leve)
-- ============================
INSERT INTO chamados (titulo, descricao, tipo_id, tecnico_id, usuario_id, status, criado_em) VALUES
('Chamado 18-08 M1', 'Manutenção predial', 1, 2, 4, 'pendente', '2025-08-18 09:10:00'),
('Chamado 18-08 AT1', 'Suporte remoto', 3, 3, 5, 'em andamento', '2025-08-18 10:50:00');

-- ============================
-- 19/08 - 8 chamados (médio)
-- ============================
INSERT INTO chamados (titulo, descricao, tipo_id, tecnico_id, usuario_id, status, criado_em) VALUES
('Chamado 19-08 M1', 'Revisão elétrica', 1, 2, 5, 'pendente', '2025-08-19 07:35:00'),
('Chamado 19-08 L1', 'Limpeza rotina', 2, 2, 4, 'em andamento', '2025-08-19 08:10:00'),
('Chamado 19-08 AT1', 'Suporte remoto', 3, 3, 6, 'concluido', '2025-08-19 08:40:00'),
('Chamado 19-08 M2', 'Manutenção hidráulica', 1, 2, 6, 'pendente', '2025-08-19 09:20:00'),
('Chamado 19-08 L2', 'Limpeza pesada', 2, 2, 5, 'em andamento', '2025-08-19 10:05:00'),
('Chamado 19-08 AT2', 'Configuração de sistema', 3, 3, 4, 'pendente', '2025-08-19 11:00:00'),
('Chamado 19-08 E1', 'Consultoria externa', 4, 3, 5, 'em andamento', '2025-08-19 11:45:00'),
('Chamado 19-08 L3', 'Limpeza pós-obra', 2, 2, 6, 'pendente', '2025-08-19 12:30:00');

-- ============================
-- 20/08 - 15 chamados (dia muito pesado)
-- ============================
INSERT INTO chamados (titulo, descricao, tipo_id, tecnico_id, usuario_id, status, criado_em) VALUES
('Chamado 20-08 M1', 'Manutenção predial', 1, 2, 4, 'pendente', '2025-08-20 07:45:00'),
('Chamado 20-08 L1', 'Limpeza rotina', 2, 2, 5, 'em andamento', '2025-08-20 08:00:00'),
('Chamado 20-08 AT1', 'Suporte remoto', 3, 3, 6, 'concluido', '2025-08-20 08:25:00'),
('Chamado 20-08 M2', 'Manutenção elétrica', 1, 2, 6, 'em andamento', '2025-08-20 08:55:00'),
('Chamado 20-08 L2', 'Limpeza pesada', 2, 2, 4, 'pendente', '2025-08-20 09:15:00'),
('Chamado 20-08 AT2', 'Configuração de sistema', 3, 3, 5, 'em andamento', '2025-08-20 09:40:00'),
('Chamado 20-08 E1', 'Consultoria externa', 4, 3, 4, 'pendente', '2025-08-20 10:10:00'),
('Chamado 20-08 L3', 'Limpeza pós-obra', 2, 2, 6, 'pendente', '2025-08-20 10:45:00'),
('Chamado 20-08 M3', 'Revisão hidráulica', 1, 2, 5, 'em andamento', '2025-08-20 11:20:00'),
('Chamado 20-08 AT3', 'Suporte remoto', 3, 3, 6, 'concluido', '2025-08-20 11:55:00'),
('Chamado 20-08 L4', 'Limpeza rotina', 2, 2, 4, 'em andamento', '2025-08-20 12:25:00'),
('Chamado 20-08 M4', 'Manutenção predial', 1, 2, 6, 'pendente', '2025-08-20 12:50:00'),
('Chamado 20-08 AT4', 'Configuração de sistema', 3, 3, 5, 'em andamento', '2025-08-20 13:30:00'),
('Chamado 20-08 E2', 'Consultoria externa', 4, 3, 4, 'pendente', '2025-08-20 14:05:00'),
('Chamado 20-08 L5', 'Limpeza pesada', 2, 2, 6, 'em andamento', '2025-08-20 14:40:00');

-- ============================
-- 21/08 - 4 chamados (leve)
-- ============================
INSERT INTO chamados (titulo, descricao, tipo_id, tecnico_id, usuario_id, status, criado_em) VALUES
('Chamado 21-08 M1', 'Manutenção elétrica', 1, 2, 4, 'pendente', '2025-08-21 08:00:00'),
('Chamado 21-08 AT1', 'Suporte remoto', 3, 3, 5, 'em andamento', '2025-08-21 09:15:00'),
('Chamado 21-08 L1', 'Limpeza rotina', 2, 2, 6, 'concluido', '2025-08-21 10:30:00'),
('Chamado 21-08 E1', 'Consultoria externa', 4, 3, 4, 'pendente', '2025-08-21 11:50:00');

-- ============================
-- 22/08 - 10 chamados (dia médio)
-- ============================
INSERT INTO chamados (titulo, descricao, tipo_id, tecnico_id, usuario_id, status, criado_em) VALUES
('Chamado 22-08 M1', 'Manutenção predial', 1, 2, 4, 'pendente', '2025-08-22 07:40:00'),
('Chamado 22-08 L1', 'Limpeza rotina', 2, 2, 5, 'em andamento', '2025-08-22 08:05:00'),
('Chamado 22-08 AT1', 'Suporte remoto', 3, 3, 6, 'concluido', '2025-08-22 08:30:00'),
('Chamado 22-08 M2', 'Revisão hidráulica', 1, 2, 6, 'pendente', '2025-08-22 09:05:00'),
('Chamado 22-08 L2', 'Limpeza pesada', 2, 2, 4, 'em andamento', '2025-08-22 09:40:00'),
('Chamado 22-08 AT2', 'Configuração de sistema', 3, 3, 5, 'em andamento', '2025-08-22 10:15:00'),
('Chamado 22-08 E1', 'Consultoria externa', 4, 3, 4, 'pendente', '2025-08-22 10:50:00'),
('Chamado 22-08 L3', 'Limpeza pós-obra', 2, 2, 6, 'em andamento', '2025-08-22 11:20:00'),
('Chamado 22-08 M3', 'Manutenção predial', 1, 2, 5, 'pendente', '2025-08-22 11:50:00'),
('Chamado 22-08 AT3', 'Suporte remoto', 3, 3, 6, 'concluido', '2025-08-22 12:25:00');
