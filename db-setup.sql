DROP TABLE IF EXISTS SavedPapers;
DROP TABLE IF EXISTS Papers;


CREATE TABLE Papers (
    PaperID TEXT PRIMARY KEY,
    Title TEXT NOT NULL,
    Authors TEXT,
    Year INTEGER CHECK(Year > 1900 AND Year <= 2100),
    SourceURL TEXT,
    Abstract TEXT,
    IsReview INTEGER DEFAULT 0 CHECK(IsReview IN (0, 1))
);

CREATE TABLE SavedPapers (
    Email TEXT NOT NULL,
    PaperID TEXT NOT NULL,
    SavedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (Email, PaperID),
    FOREIGN KEY (PaperID) REFERENCES Papers(PaperID) ON DELETE CASCADE
);

-- Mock data
INSERT INTO Papers (PaperID, Title, Authors, Year, SourceURL, Abstract, IsReview) VALUES
(
    'sample-paper-1',
    'A Review of Machine Learning in Healthcare',
    'John Smith, Jane Doe',
    2023,
    'https://www.semanticscholar.org/paper/sample-paper-1',
    'This review examines the application of machine learning algorithms in healthcare settings, covering diagnostic tools, treatment planning, and patient outcome prediction. Neural networks have shown particular promise in medical imaging tasks.',
    1
),
(
    'sample-paper-2',
    'Deep Learning for Natural Language Processing: A Survey',
    'Alice Johnson, Bob Wilson',
    2022,
    'https://www.semanticscholar.org/paper/sample-paper-2',
    'We survey recent advances in deep learning approaches to natural language processing tasks including text classification, machine translation, and question answering. Transformer architectures have become the dominant paradigm.',
    1
),
(
    'sample-paper-3',
    'Climate Change and Biodiversity: A Systematic Review',
    'Emma Brown, Carlos Garcia',
    2024,
    'https://www.semanticscholar.org/paper/sample-paper-3',
    'This systematic review analyzes the impact of climate change on global biodiversity across terrestrial and marine ecosystems. Rising temperatures and shifting precipitation patterns are causing significant species displacement.',
    1
);

INSERT INTO SavedPapers (Email, PaperID) VALUES
('test@example.com', 'sample-paper-1'),
('test@example.com', 'sample-paper-2');
