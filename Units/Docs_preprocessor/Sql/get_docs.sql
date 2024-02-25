select
    `num`,
    `type`,
    `organ`,
    `name`,
    `num_public`,
    `date_public`
    from `Docs`
    where `date` LIKE :date and
    `num` LIKE :num and
    `type` LIKE :type and
    `organ` LIKE :organ and
    `name` LIKE :name and
    `num_public` LIKE :num_public and
    `date_public` LIKE :date_public;
