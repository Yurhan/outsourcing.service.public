Insert Into Doctor(name)
values ('Dr Office 1'), 
	   ('Dr Office 2');

Insert Into Staff(name)
values ('Main Staff');

Insert Into Staff(name)
values ('Staff2'),('Staff3');

Insert Into Patient(name, uid, doctorid, meta, keywords, gender, age, phones, availability)
values ('patient 1', UNHEX('10000000000000000000000000000000'), 1, 'Have a cancer.', 'cancer', 'M', 40, '212.555.1234, 212.555.1235', null),
	   ('patient 2', UNHEX('10000000000000000000000000000001'), 1, 'Have a diabetes.', 'diabetes', 'F', 30, '212.555.1238, 212.555.1238', null),
	   ('patient 3', UNHEX('10000000000000000000000000000002'), 1, 'Have a hypertension and diabetes.', 'hypertension,diabetes', 'M', 25, '212.555.1239, 212.556.1239', null),
       ('patient 4', UNHEX('10000000000000000000000000000003'), 1, 'Have a hypertension and diabetes.1', 'hypertension,diabetes', 'M', 43, '212.555.1231, 212.556.1231', null),
       ('patient 5', UNHEX('10000000000000000000000000000004'), 1, 'Have a hypertension and diabetes.2', 'hypertension,diabetes', 'M', 33, '212.555.1232, 212.556.1232', null),
       ('patient 6', UNHEX('10000000000000000000000000000005'), 1, 'Have a hypertension and diabetes.3', 'hypertension,diabetes', 'M', 30, '212.555.1233, 212.556.1233', null),
       ('patient 7', UNHEX('10000000000000000000000000000006'), 2, 'Have a hypertension and diabetes.4', 'hypertension,diabetes', 'M', 15, '212.555.1234, 212.556.1234', null),
       ('patient 8', UNHEX('10000000000000000000000000000007'), 2, 'Have a hypertension.5', 'hypertension', 'F', 65, '212.555.1235, 212.556.1235', null),
       ('patient 9', UNHEX('10000000000000000000000000000008'), 2, 'Have a hypertension.6', 'hypertension', 'F', 55, '212.555.1236, 212.556.1236', null),
       ('patient 10', UNHEX('10000000000000000000000000000009'), 2, 'Have a hypertension.7', 'hypertension', 'F', 45, '212.555.1237, 212.556.1237', null),
       ('patient 11', UNHEX('10000000000000000000000000000010'), 2, 'Have a hypertension.8', 'hypertension', 'F', 35, '212.555.1239, 212.556.1239', null),
       ('Mickle', UNHEX('10000000000000000000000000000011'), 1, 'poorly sees', 'eyes', 'M', 28, '+15165818093', null);
       