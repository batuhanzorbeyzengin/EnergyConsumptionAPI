DELIMITER //
CREATE TRIGGER after_endeks_insert
AFTER INSERT ON Endeks
FOR EACH ROW
BEGIN
    DECLARE prev_date DATE;
    DECLARE prev_value INT;
    DECLARE next_date DATE;
    DECLARE next_value INT;
    DECLARE consumption_value INT;
    DECLARE total_days INT;
    DECLARE cur_date DATE;

    -- Check if this is the first entry for the company
    IF (SELECT COUNT(*) FROM Endeks WHERE userId = NEW.userId) > 1 THEN

        -- Find the previous index
        SELECT date, value INTO prev_date, prev_value
        FROM Endeks
        WHERE userId = NEW.userId AND date = (
            SELECT MAX(date)
            FROM Endeks
            WHERE date < NEW.date AND userId = NEW.userId
        );

        -- Find the next index (if any)
        SELECT date, value INTO next_date, next_value
        FROM Endeks
        WHERE userId = NEW.userId AND date = (
            SELECT MIN(date)
            FROM Endeks
            WHERE date > NEW.date AND userId = NEW.userId
        );

        -- Calculate consumption for the period between the new index and the previous index
        IF prev_date IS NOT NULL THEN
            SET total_days = DATEDIFF(NEW.date, prev_date);
            SET consumption_value = (NEW.value - prev_value) / total_days;
            SET cur_date = prev_date;
            WHILE cur_date < NEW.date DO
                INSERT INTO Consumption (date, value, endeksId) VALUES (cur_date, consumption_value, NEW.id);
                SET cur_date = DATE_ADD(cur_date, INTERVAL 1 DAY);
            END WHILE;
        END IF;

        -- Recalculate consumption for the period between the new index and the next index (if any)
        IF next_date IS NOT NULL THEN
            SET total_days = DATEDIFF(next_date, NEW.date);
            SET consumption_value = (next_value - NEW.value) / total_days;
            SET cur_date = NEW.date;
            WHILE cur_date < next_date DO
                -- Update if exists, otherwise insert
                IF EXISTS (SELECT * FROM Consumption WHERE date = cur_date AND endeksId = NEW.id) THEN
                    UPDATE Consumption SET value = consumption_value WHERE date = cur_date AND endeksId = NEW.id;
                ELSE
                    INSERT INTO Consumption (date, value, endeksId) VALUES (cur_date, consumption_value, NEW.id);
                END IF;
                SET cur_date = DATE_ADD(cur_date, INTERVAL 1 DAY);
            END WHILE;
        END IF;

    END IF;
END//
DELIMITER ;
