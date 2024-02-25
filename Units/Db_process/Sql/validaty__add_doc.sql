select `num_public`
    from `Docs`
    where `date` = :date and
    `num` = :num and
    `type` = :type and
    `organ` = :organ;
