package org.burningokr.mapper.structure;

import java.util.ArrayList;
import java.util.Collection;
import org.burningokr.dto.structure.CorporateObjectiveStructureDto;
import org.burningokr.mapper.interfaces.DataMapper;
import org.burningokr.model.structures.CorporateObjectiveStructure;
import org.springframework.stereotype.Service;

@Service
public class CorporateObjectiveStructureMapper
    implements DataMapper<CorporateObjectiveStructure, CorporateObjectiveStructureDto> {
  @Override
  public CorporateObjectiveStructure mapDtoToEntity(CorporateObjectiveStructureDto dto) {
    CorporateObjectiveStructure entity = new CorporateObjectiveStructure();
    entity.setId(dto.getId());
    entity.setName(dto.getName());
    return entity;
  }

  @Override
  public CorporateObjectiveStructureDto mapEntityToDto(CorporateObjectiveStructure entity) {
    CorporateObjectiveStructureDto dto = new CorporateObjectiveStructureDto();
    dto.setId(entity.getId());
    dto.setName(entity.getName());
    dto.setParentStructureId(
        entity.getParentStructure() != null ? entity.getParentStructure().getId() : null);
    entity.getDepartments().forEach(department -> dto.getDepartmentIds().add(department.getId()));
    entity.getObjectives().forEach(objective -> dto.getObjectiveIds().add(objective.getId()));
    entity
        .getCorporateObjectiveStructures()
        .forEach(cos -> dto.getCorporateObjectiveStructureIds().add(cos.getId()));
    return dto;
  }

  @Override
  public Collection<CorporateObjectiveStructure> mapDtosToEntities(
      Collection<CorporateObjectiveStructureDto> input) {
    Collection<CorporateObjectiveStructure> entities = new ArrayList<>();
    input.forEach(
        corporateObjectiveStructureDto ->
            entities.add(mapDtoToEntity(corporateObjectiveStructureDto)));
    return entities;
  }

  @Override
  public Collection<CorporateObjectiveStructureDto> mapEntitiesToDtos(
      Collection<CorporateObjectiveStructure> entities) {
    Collection<CorporateObjectiveStructureDto> dtos = new ArrayList<>();
    entities.forEach(entity -> dtos.add(mapEntityToDto(entity)));
    return dtos;
  }
}
