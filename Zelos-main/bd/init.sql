DROP DATABASE IF EXISTS zelo;
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
        titulo ENUM('externo', 'manutencao', 'apoio_tecnico', 'limpeza') NOT NULL,
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
    prioridade ENUM('Baixa', 'Média', 'Alta') DEFAULT 'Baixa', -- ADICIONADO: Coluna prioridade
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

-- ============================
-- Inserindo usuários
-- ============================
INSERT INTO usuarios (nome, numeroUsuario, funcao) VALUES
('Admin 1', 'admin1', 'admin'),
('José da Silva', 'tec1', 'tecnico'),
('Ronaldo', 'tec2', 'tecnico'),
('Usuario 1', 'usu1', 'usuario'),
('Usuario 2', 'usu2', 'usuario'),
('Usuario 3', 'usu3', 'usuario');

-- ============================
-- Popula a tabela pool (tipos de chamados) - Garantindo que os IDs correspondam aos inserts abaixo
-- ID 1: manutencao
-- ID 2: limpeza
-- ID 3: apoio_tecnico
-- ID 4: externo
-- ============================
INSERT INTO pool (titulo, descricao, status, created_by, updated_by) VALUES
('manutencao', 'Manutenção predial e de equipamentos', 'ativo', 1, 1),
('limpeza', 'Serviços de limpeza e higienização', 'ativo', 1, 1),
('apoio_tecnico', 'Suporte técnico e configuração de sistemas', 'ativo', 1, 1),
('externo', 'Consultoria e serviços externos especializados', 'ativo', 1, 1);

-- ============================
-- Inserindo Chamados com tipo_id e prioridade
-- Considerando:
-- Tecnico 1 (ID 2), Tecnico 2 (ID 3)
-- Usuario 1 (ID 4), Usuario 2 (ID 5), Usuario 3 (ID 6)
-- Tipos: 1=manutencao, 2=limpeza, 3=apoio_tecnico, 4=externo
-- ============================

-- ============================
-- 16/09 - 3 chamados (dia leve)
-- ============================
INSERT INTO chamados (titulo, descricao, tipo_id, tecnico_id, usuario_id, status, criado_em) VALUES
('Chamado 16-09 L1', 'Limpeza rotina', 2, 2, 4, 'pendente', '2025-09-16 09:05:00'),
('Chamado 16-09 AT1', 'Suporte remoto', 3, 3, 5, 'em andamento', '2025-09-16 09:30:00'),
('Chamado 16-09 M1', 'Manutenção predial', 1, 2, 6, 'concluido', '2025-09-16 11:15:00');

-- ============================
-- 17/09 - 12 chamados (dia pesado)
-- ============================
INSERT INTO chamados (titulo, descricao, tipo_id, tecnico_id, usuario_id, status, criado_em) VALUES
('Chamado 17-09 M1', 'Manutenção elétrica', 1, 2, 4, 'pendente', '2025-09-17 07:50:00'),
('Chamado 17-09 L1', 'Limpeza pesada', 2, 2, 5, 'em andamento', '2025-09-17 09:20:00'),
('Chamado 17-09 AT1', 'Suporte remoto', 3, 3, 6, 'concluido', '2025-09-17 09:45:00'),
('Chamado 17-09 M2', 'Revisão hidráulica', 1, 2, 6, 'pendente', '2025-09-17 09:15:00'),
('Chamado 17-09 L2', 'Limpeza pós-obra', 2, 2, 4, 'em andamento', '2025-09-17 09:50:00'),
('Chamado 17-09 AT2', 'Configuração de sistema', 3, 3, 5, 'em andamento', '2025-09-17 10:30:00'),
('Chamado 17-09 E1', 'Consultoria externa', 4, 3, 4, 'pendente', '2025-09-17 11:05:00'),
('Chamado 17-09 L3', 'Limpeza rotina', 2, 2, 6, 'pendente', '2025-09-17 11:45:00'),
('Chamado 17-09 M3', 'Manutenção predial', 1, 2, 5, 'em andamento', '2025-09-17 12:10:00'),
('Chamado 17-09 AT3', 'Suporte remoto', 3, 3, 4, 'concluido', '2025-09-17 12:40:00'),
('Chamado 17-09 L4', 'Limpeza pesada', 2, 2, 6, 'em andamento', '2025-09-17 13:15:00'),
('Chamado 17-09 E2', 'Consultoria externa', 4, 3, 5, 'pendente', '2025-09-17 14:00:00');

-- ============================
-- 18/08 - 2 chamados (dia muito leve)
-- ============================
INSERT INTO chamados (titulo, descricao, tipo_id, tecnico_id, usuario_id, status, criado_em) VALUES
('Chamado 18-09 M1', 'Manutenção predial', 1, 2, 4, 'pendente', '2025-09-19 09:10:00'),
('Chamado 19-09 AT1', 'Suporte remoto', 3, 3, 5, 'em andamento', '2025-09-19 10:50:00');

-- ============================
-- 19/09 - 9 chamados (médio)
-- ============================
INSERT INTO chamados (titulo, descricao, tipo_id, tecnico_id, usuario_id, status, criado_em) VALUES
('Chamado 19-09 M1', 'Revisão elétrica', 1, 2, 5, 'pendente', '2025-09-19 07:35:00'),
('Chamado 19-09 L1', 'Limpeza rotina', 2, 2, 4, 'em andamento', '2025-09-19 09:10:00'),
('Chamado 19-09 AT1', 'Suporte remoto', 3, 3, 6, 'concluido', '2025-09-19 09:40:00'),
('Chamado 19-09 M2', 'Manutenção hidráulica', 1, 2, 6, 'pendente', '2025-09-19 09:20:00'),
('Chamado 19-09 L2', 'Limpeza pesada', 2, 2, 5, 'em andamento', '2025-09-19 10:05:00'),
('Chamado 19-09 AT2', 'Configuração de sistema', 3, 3, 4, 'pendente', '2025-09-19 11:00:00'),
('Chamado 19-09 E1', 'Consultoria externa', 4, 3, 5, 'em andamento', '2025-09-19 11:45:00'),
('Chamado 19-09 L3', 'Limpeza pós-obra', 2, 2, 6, 'pendente', '2025-09-19 12:30:00');

-- ============================
-- 20/09 - 15 chamados (dia muito pesado)
-- ============================
INSERT INTO chamados (titulo, descricao, tipo_id, tecnico_id, usuario_id, status, criado_em) VALUES
('Chamado 20-09 M1', 'Manutenção predial', 1, 2, 4, 'pendente', '2025-09-20 07:45:00'),
('Chamado 20-09 L1', 'Limpeza rotina', 2, 2, 5, 'em andamento', '2025-09-20 09:00:00'),
('Chamado 20-09 AT1', 'Suporte remoto', 3, 3, 6, 'concluido', '2025-09-20 09:25:00'),
('Chamado 20-09 M2', 'Manutenção elétrica', 1, 2, 6, 'em andamento', '2025-09-20 09:55:00'),
('Chamado 20-09 L2', 'Limpeza pesada', 2, 2, 4, 'pendente', '2025-09-20 09:15:00'),
('Chamado 20-09 AT2', 'Configuração de sistema', 3, 3, 5, 'em andamento', '2025-09-20 09:40:00'),
('Chamado 20-09 E1', 'Consultoria externa', 4, 3, 4, 'pendente', '2025-09-20 10:10:00'),
('Chamado 20-09 L3', 'Limpeza pós-obra', 2, 2, 6, 'pendente', '2025-09-20 10:45:00'),
('Chamado 20-09 M3', 'Revisão hidráulica', 1, 2, 5, 'em andamento', '2025-09-20 11:20:00'),
('Chamado 20-09 AT3', 'Suporte remoto', 3, 3, 6, 'concluido', '2025-09-20 11:55:00'),
('Chamado 20-09 L4', 'Limpeza rotina', 2, 2, 4, 'em andamento', '2025-09-20 12:25:00'),
('Chamado 20-09 M4', 'Manutenção predial', 1, 2, 6, 'pendente', '2025-09-20 12:50:00'),
('Chamado 20-09 AT4', 'Configuração de sistema', 3, 3, 5, 'em andamento', '2025-09-20 13:30:00'),
('Chamado 20-09 E2', 'Consultoria externa', 4, 3, 4, 'pendente', '2025-09-20 14:05:00'),
('Chamado 20-09 L5', 'Limpeza pesada', 2, 2, 6, 'em andamento', '2025-09-20 14:40:00');

-- ============================
-- 21/09 - 4 chamados (leve)
-- ============================
INSERT INTO chamados (titulo, descricao, tipo_id, tecnico_id, usuario_id, status, criado_em) VALUES
('Chamado 21-09 M1', 'Manutenção elétrica', 1, 2, 4, 'pendente', '2025-08-21 08:00:00'),
('Chamado 21-09 AT1', 'Suporte remoto', 3, 3, 5, 'em andamento', '2025-08-21 09:15:00'),
('Chamado 21-09 L1', 'Limpeza rotina', 2, 2, 6, 'concluido', '2025-09-21 10:30:00'),
('Chamado 21-09 E1', 'Consultoria externa', 4, 3, 4, 'pendente', '2025-09-21 11:50:00');

-- ============================
-- 22/09 - 10 chamados (dia médio)
-- ============================
INSERT INTO chamados (titulo, descricao, tipo_id, tecnico_id, usuario_id, status, criado_em) VALUES
('Chamado 22-09 M1', 'Manutenção predial', 1, 2, 4, 'pendente', '2025-09-22 07:40:00'),
('Chamado 22-09 L1', 'Limpeza rotina', 2, 2, 5, 'em andamento', '2025-09-22 09:05:00'),
('Chamado 22-09 AT1', 'Suporte remoto', 3, 3, 6, 'concluido', '2025-09-22 09:30:00'),
('Chamado 22-09 M2', 'Revisão hidráulica', 1, 2, 6, 'pendente', '2025-09-22 09:05:00'),
('Chamado 22-09 L2', 'Limpeza pesada', 2, 2, 4, 'em andamento', '2025-09-22 09:40:00'),
('Chamado 22-09 AT2', 'Configuração de sistema', 3, 3, 5, 'em andamento', '2025-09-22 10:15:00'),
('Chamado 22-09 E1', 'Consultoria externa', 4, 3, 4, 'pendente', '2025-09-22 10:50:00'),
('Chamado 22-09 L3', 'Limpeza pós-obra', 2, 2, 6, 'em andamento', '2025-09-22 11:20:00'),
('Chamado 22-09 M3', 'Manutenção predial', 1, 2, 5, 'pendente', '2025-09-22 11:50:00'),
('Chamado 22-09 AT3', 'Suporte remoto', 3, 3, 6, 'concluido', '2025-09-22 12:25:00');


SELECT * FROM usuarios;


UPDATE usuarios
set funcao = 'tecnico'
where id = 8;
-- ============================
-- Inserindo apontamentos para os relatórios (chamados concluídos)
-- ============================
INSERT INTO apontamentos (chamado_id, tecnico_id, descricao, comeco, fim) VALUES
-- Apontamentos para o Chamado 3 (concluído)
(3, 2, 'Iniciada verificação do sistema de ar condicionado.', '2025-09-16 11:15:00', '2025-09-16 12:00:00'),
(3, 2, 'Filtros limpos e sistema testado. Chamado finalizado.', '2025-09-16 12:00:00', '2025-09-16 12:30:00'),
(3, 1, 'Relatório verificado pelo admin.', '2025-09-16 15:00:00', '2025-09-16 15:05:00'),
-- Apontamentos para o Chamado 6 (concluído)
(6, 3, 'Acesso remoto realizado para configuração de impressora.', '2025-09-17 09:45:00', '2025-09-17 10:15:00'),
(6, 3, 'Impressora configurada e funcionando. Chamado concluído.', '2025-09-17 10:15:00', '2025-09-17 10:20:00'),
-- Apontamentos para o Chamado 13 (concluído)
(13, 3, 'Atendimento remoto para resolver problema de login.', '2025-09-17 12:40:00', '2025-09-17 13:00:00'),
-- Apontamentos para o Chamado 16 (concluído)
(16, 3, 'Suporte para instalação de software X.', '2025-09-19 09:40:00', '2025-09-19 10:00:00'),
(16, 3, 'Software instalado e validado pelo usuário.', '2025-09-19 10:00:00', '2025-09-19 10:10:00'),
-- Apontamentos para o Chamado 18 (concluído)
(18, 3, 'Conexão remota estabelecida. Verificando logs do sistema.', '2025-09-20 09:25:00', '2025-09-20 09:45:00'),
(18, 3, 'Problema identificado e corrigido. Sistema normalizado.', '2025-09-20 09:45:00', '2025-09-20 09:55:00'),
-- Apontamentos para o Chamado 22 (concluído)
(22, 2, 'Limpeza de rotina executada no setor administrativo.', '2025-09-21 10:30:00', '2025-09-21 11:30:00'),
-- Apontamentos para o Chamado 23 (concluído)
(23, 3, 'Reset de senha solicitado pelo usuário.', '2025-09-22 09:30:00', '2025-09-22 09:35:00'),
-- Apontamentos para o Chamado 24 (concluído)
(24, 3, 'Atendimento remoto para dúvida sobre o sistema X.', '2025-09-22 12:25:00', '2025-09-22 12:40:00'),
(24, 3, 'Dúvida esclarecida. Finalizando chamado.', '2025-09-22 12:40:00', '2025-09-22 12:45:00');

