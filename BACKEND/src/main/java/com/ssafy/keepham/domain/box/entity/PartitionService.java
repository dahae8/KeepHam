package com.ssafy.keepham.domain.box.entity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PartitionService {

    private final PartitionRepository partitionRepository;

    @Autowired
    public PartitionService(PartitionRepository partitionRepository){
        this.partitionRepository = partitionRepository;
    }

    public Partition savePartition(Partition partition){
        return partitionRepository.save(partition);
    }
}
