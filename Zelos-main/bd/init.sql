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
    titulo ENUM('manutencao', 'apoio_tecnico', 'limpeza', 'externo') NOT NULL, -- Garante que 'externo' esteja aqui
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
('Tecnico 1', 'tec1', 'tecnico'),
('Tecnico 2', 'tec2', 'tecnico'),
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
-- 16/08 - 3 chamados (dia leve)
-- ============================
INSERT INTO chamados (titulo, descricao, tipo_id, tecnico_id, usuario_id, status, prioridade, criado_em) VALUES
('Limpeza de Escritórios', 'Limpeza geral dos escritórios do segundo andar.', 2, 2, 4, 'pendente', 'Baixa', '2025-08-16 08:05:00'),
('Problema com Rede Wifi', 'Rede WiFi instável na sala de reuniões. Necessita de suporte técnico.', 3, 3, 5, 'em andamento', 'Média', '2025-08-16 09:30:00'),
('Reparo de Ar Condicionado', 'Ar condicionado do setor B com vazamento e sem gelar.', 1, 2, 6, 'concluido', 'Alta', '2025-08-16 11:15:00');

-- ============================
-- 17/08 - 12 chamados (dia pesado)
-- ============================
INSERT INTO chamados (titulo, descricao, tipo_id, tecnico_id, usuario_id, status, prioridade, criado_em) VALUES
('Troca de Lâmpadas', 'Diversas lâmpadas queimadas no corredor principal.', 1, 2, 4, 'pendente', 'Baixa', '2025-08-17 07:50:00'),
('Limpeza de Banheiros', 'Limpeza diária e reposição de materiais nos banheiros.', 2, 2, 5, 'em andamento', 'Baixa', '2025-08-17 08:20:00'),
('Configuração de Impressora', 'Nova impressora multifuncional precisa ser configurada na rede.', 3, 3, 6, 'concluido', 'Média', '2025-08-17 08:45:00'),
('Vazamento na Cozinha', 'Pequeno vazamento na pia da cozinha. Necessário reparo hidráulico.', 1, 2, 6, 'pendente', 'Alta', '2025-08-17 09:15:00'),
('Limpeza Profunda do Refeitório', 'Limpeza completa do refeitório e equipamentos.', 2, 2, 4, 'em andamento', 'Média', '2025-08-17 09:50:00'),
('Instalação de Software', 'Instalação do pacote Adobe Creative Cloud em 3 máquinas.', 3, 3, 5, 'em andamento', 'Média', '2025-08-17 10:30:00'),
('Consultoria em Segurança', 'Avaliação de vulnerabilidades na rede externa da empresa.', 4, 3, 4, 'pendente', 'Alta', '2025-08-17 11:05:00'),
('Limpeza de Janelas', 'Limpeza externa das janelas do prédio.', 2, 2, 6, 'pendente', 'Baixa', '2025-08-17 11:45:00'),
('Manutenção Preventiva de Servidores', 'Rotina de checagem e otimização dos servidores.', 1, 2, 5, 'em andamento', 'Alta', '2025-08-17 12:10:00'),
('Recuperação de Dados', 'Arquivos importantes deletados acidentalmente de um disco.', 3, 3, 4, 'concluido', 'Alta', '2025-08-17 12:40:00'),
('Desinfecção de Ambientes', 'Solicitação de desinfecção pós-covid em algumas salas.', 2, 2, 6, 'em andamento', 'Média', '2025-08-17 13:15:00'),
('Cotação de Equipamentos', 'Levantamento de preços para novos equipamentos de rede.', 4, 3, 5, 'pendente', 'Média', '2025-08-17 14:00:00');

-- ============================
-- 18/08 - 2 chamados (dia muito leve)
-- ============================
INSERT INTO chamados (titulo, descricao, tipo_id, tecnico_id, usuario_id, status, prioridade, criado_em) VALUES
('Ajuste de Cadeira Ergonômica', 'Ajustar a altura e encosto da cadeira do posto 5.', 1, 2, 4, 'pendente', 'Baixa', '2025-08-18 09:10:00'),
('Conexão de VPN', 'Problemas para conectar à VPN corporativa de casa.', 3, 3, 5, 'em andamento', 'Média', '2025-08-18 10:50:00');

-- ============================
-- 19/08 - 8 chamados (médio)
-- ============================
INSERT INTO chamados (titulo, descricao, tipo_id, tecnico_id, usuario_id, status, prioridade, criado_em) VALUES
('Manutenção de Portão Automático', 'Portão da garagem travando ao abrir e fechar.', 1, 2, 5, 'pendente', 'Alta', '2025-08-19 07:35:00'),
('Limpeza de Carpetes', 'Limpeza a seco dos carpetes da área comercial.', 2, 2, 4, 'em andamento', 'Baixa', '2025-08-19 08:10:00'),
('Email Corporativo não Envia', 'Usuário não consegue enviar e-mails via Outlook.', 3, 3, 6, 'concluido', 'Média', '2025-08-19 08:40:00'),
('Reparo de Tomadas', 'Três tomadas do auditório estão sem energia.', 1, 2, 6, 'pendente', 'Média', '2025-08-19 09:20:00'),
('Limpeza Pós-Evento', 'Limpeza completa do salão após evento corporativo.', 2, 2, 5, 'em andamento', 'Alta', '2025-08-19 10:05:00'),
('Lentidão no Sistema ERP', 'Sistema ERP muito lento para processar pedidos.', 3, 3, 4, 'pendente', 'Alta', '2025-08-19 11:00:00'),
('Instalação de Câmeras de Segurança', 'Instalação de novas câmeras no perímetro externo.', 4, 3, 5, 'em andamento', 'Alta', '2025-08-19 11:45:00'),
('Descarte de Lixo Eletrônico', 'Recolhimento e descarte adequado de lixo eletrônico.', 2, 2, 6, 'pendente', 'Baixa', '2025-08-19 12:30:00');

-- ============================
-- 20/08 - 15 chamados (dia muito pesado)
-- ============================
INSERT INTO chamados (titulo, descricao, tipo_id, tecnico_id, usuario_id, status, prioridade, criado_em) VALUES
('Manutenção Preventiva de Elevadores', 'Checagem mensal de todos os elevadores.', 1, 2, 4, 'pendente', 'Média', '2025-08-20 07:45:00'),
('Limpeza Diária das Áreas Comuns', 'Limpeza e organização das áreas de convivência.', 2, 2, 5, 'em andamento', 'Baixa', '2025-08-20 08:00:00'),
('Troca de Senha de Usuário', 'Reset de senha para usuário que esqueceu a sua.', 3, 3, 6, 'concluido', 'Baixa', '2025-08-20 08:25:00'),
('Conserto de Vazamento em Tubulação', 'Vazamento grande na tubulação do subsolo.', 1, 2, 6, 'em andamento', 'Alta', '2025-08-20 08:55:00'),
('Limpeza de Fachada', 'Limpeza externa da fachada do prédio.', 2, 2, 4, 'pendente', 'Média', '2025-08-20 09:15:00'),
('Problema com Rede Compartilhada', 'Usuários não conseguem acessar pastas compartilhadas.', 3, 3, 5, 'em andamento', 'Média', '2025-08-20 09:40:00'),
('Auditoria de Rede', 'Auditoria completa da infraestrutura de rede.', 4, 3, 4, 'pendente', 'Alta', '2025-08-20 10:10:00'),
('Limpeza de Vidros Internos', 'Limpeza de todos os vidros e espelhos internos.', 2, 2, 6, 'pendente', 'Baixa', '2025-08-20 10:45:00'),
('Reparo de Câmeras de Vigilância', 'Algumas câmeras de segurança não estão funcionando.', 1, 2, 5, 'em andamento', 'Média', '2025-08-20 11:20:00'),
('Backup de Servidor', 'Rotina de backup manual em servidor específico.', 3, 3, 6, 'concluido', 'Alta', '2025-08-20 11:55:00'),
('Limpeza de Estoque', 'Organização e limpeza do depósito de materiais.', 2, 2, 4, 'em andamento', 'Baixa', '2025-08-20 12:25:00'),
('Problema em Quadro Elétrico', 'Quadro elétrico do setor C com cheiro de queimado.', 1, 2, 6, 'pendente', 'Alta', '2025-08-20 12:50:00'),
('Suporte a Software Específico', 'Ajuda com funcionalidade complexa de software X.', 3, 3, 5, 'em andamento', 'Média', '2025-08-20 13:30:00'),
('Implantação de Novo Sistema', 'Acompanhamento da equipe externa na implantação.', 4, 3, 4, 'pendente', 'Alta', '2025-08-20 14:05:00'),
('Higienização de Equipamentos de Copa', 'Limpeza de microondas, cafeteira e geladeiras.', 2, 2, 6, 'em andamento', 'Baixa', '2025-08-20 14:40:00');

-- ============================
-- 21/08 - 4 chamados (leve)
-- ============================
INSERT INTO chamados (titulo, descricao, tipo_id, tecnico_id, usuario_id, status, prioridade, criado_em) VALUES
('Manutenção de Impressora Corporativa', 'Impressora central puxando papel torto.', 1, 2, 4, 'pendente', 'Média', '2025-08-21 08:00:00'),
('Problemas com E-mail', 'Não consigo receber e-mails externos.', 3, 3, 5, 'em andamento', 'Alta', '2025-08-21 09:15:00'),
('Limpeza de Sala de Servidores', 'Limpeza especializada na sala de servidores.', 2, 2, 6, 'concluido', 'Baixa', '2025-08-21 10:30:00'),
('Orçamento de Projetor Novo', 'Cotação para compra de um novo projetor para sala de reuniões.', 4, 3, 4, 'pendente', 'Média', '2025-08-21 11:50:00');

-- ============================
-- 22/08 - 10 chamados (dia médio)
-- ============================
INSERT INTO chamados (titulo, descricao, tipo_id, tecnico_id, usuario_id, status, prioridade, criado_em) VALUES
('Revisão Elétrica Predial', 'Verificação geral da instalação elétrica do prédio.', 1, 2, 4, 'pendente', 'Alta', '2025-08-22 07:40:00'),
('Limpeza de Carpetes e Tapetes', 'Limpeza profunda de todos os carpetes e tapetes da recepção.', 2, 2, 5, 'em andamento', 'Média', '2025-08-22 08:05:00'),
('Instalação de Novo Monitor', 'Instalar novo monitor ultrawide em estação de trabalho.', 3, 3, 6, 'concluido', 'Baixa', '2025-08-22 08:30:00'),
('Problema na Fechadura Eletrônica', 'Fechadura da porta da diretoria não está respondendo.', 1, 2, 6, 'pendente', 'Alta', '2025-08-22 09:05:00'),
('Descarte de Material de Escritório Antigo', 'Remoção de móveis e materiais antigos do almoxarifado.', 2, 2, 4, 'em andamento', 'Baixa', '2025-08-22 09:40:00'),
('Configuração de Softphone', 'Instalação e configuração de softphone para trabalho remoto.', 3, 3, 5, 'em andamento', 'Média', '2025-08-22 10:15:00'),
('Acompanhamento de Fornecedor Externo', 'Monitorar trabalho de empresa de segurança externa.', 4, 3, 4, 'pendente', 'Alta', '2025-08-22 10:50:00'),
('Limpeza de Espaços de Convivência', 'Limpeza e arrumação de salas de descanso e lounges.', 2, 2, 6, 'em andamento', 'Baixa', '2025-08-22 11:20:00'),
('Reparo de Elevador de Carga', 'Elevador de carga do estoque apresentando barulhos estranhos.', 1, 2, 5, 'pendente', 'Média', '2025-08-22 11:50:00'),
('Problema com Compartilhamento de Tela', 'Dificuldade para compartilhar tela em videoconferência.', 3, 3, 6, 'concluido', 'Média', '2025-08-22 12:25:00');

-- Exemplo para verificar os dados
SELECT
    c.id,
    c.titulo,
    c.descricao,
    c.status,
    c.prioridade,
    p.titulo AS tipo_nome,
    u_tec.nome AS tecnico_nome,
    u_usu.nome AS usuario_nome,
    c.criado_em
FROM chamados c
LEFT JOIN pool p ON c.tipo_id = p.id
LEFT JOIN usuarios u_tec ON c.tecnico_id = u_tec.id
LEFT JOIN usuarios u_usu ON c.usuario_id = u_usu.id
ORDER BY c.criado_em DESC;


