DROP TABLE IF EXISTS PaperRelations;
DROP TABLE IF EXISTS SavedPapers;
DROP TABLE IF EXISTS Papers;
DROP TABLE IF EXISTS Categories;

CREATE TABLE Categories (
    CategoryID INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT NOT NULL UNIQUE CHECK(length(Name) > 0)
);

CREATE TABLE Papers (
    PaperID TEXT PRIMARY KEY,
    Title TEXT NOT NULL CHECK(length(Title) > 0),
    Authors TEXT,
    Year INTEGER CHECK(Year > 1900 AND Year <= 2100),
    SourceURL TEXT,
    OriginalAbstract TEXT,
    SimplifiedAbstract TEXT,
    IsReview INTEGER DEFAULT 0 CHECK(IsReview IN (0, 1)),
    CategoryID INTEGER,
    FOREIGN KEY (CategoryID) REFERENCES Categories(CategoryID)
);

CREATE TABLE PaperRelations (
    ReviewID TEXT NOT NULL,
    PaperID TEXT NOT NULL,
    PRIMARY KEY (ReviewID, PaperID),
    FOREIGN KEY (ReviewID) REFERENCES Papers(PaperID) ON DELETE CASCADE,
    FOREIGN KEY (PaperID) REFERENCES Papers(PaperID) ON DELETE CASCADE
);

CREATE TABLE SavedPapers (
    Email TEXT NOT NULL CHECK(Email LIKE '%@%.%'),
    PaperID TEXT NOT NULL,
    SavedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (Email, PaperID),
    FOREIGN KEY (PaperID) REFERENCES Papers(PaperID) ON DELETE CASCADE
);

-- Starter Data
INSERT INTO Categories (Name) VALUES
    ('Artificial Intelligence'),
    ('Biology'),
    ('Climate Science'),
    ('Medicine'),
    ('Physics');

INSERT INTO Papers (PaperID, Title, Authors, Year, SourceURL, OriginalAbstract, SimplifiedAbstract, IsReview, CategoryID) VALUES
    (
        'paper-001',
        'A Survey of Large Language Models',
        'Wayne Xin Zhao, Kun Zhou',
        2023,
        'https://arxiv.org/abs/2303.18223',
        'Language is essentially a complex, intricate system of human expressions governed by grammatical rules...',
        'This paper reviews the latest AI tools that can understand and generate human language, like ChatGPT.',
        1,
        1
    ),
    (
        'paper-002',
        'Climate Change and Biodiversity: A Review',
        'John Smith, Emily Brown',
        2022,
        'https://example.com/climate-biodiversity',
        'Global climate change poses significant threats to biodiversity across ecosystems worldwide...',
        'This paper explains how rising temperatures are causing animals and plants to lose their natural habitats.',
        1,
        3
    ),
    (
        'paper-003',
        'Deep Learning in Medical Imaging',
        'Sarah Lee, James Kim',
        2021,
        'https://example.com/dl-medical',
        'Deep learning has revolutionized medical imaging analysis by enabling automated detection...',
        'This paper shows how AI can help doctors detect diseases earlier by analyzing medical scans.',
        1,
        4
    );
