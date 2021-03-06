package org.burningokr.model.cycles;

import java.util.ArrayList;
import java.util.Collection;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import lombok.Data;
import org.burningokr.model.activity.Trackable;
import org.burningokr.model.structures.Company;

@Entity
@Data
public class CompanyHistory implements Trackable<Long> {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @OneToMany(mappedBy = "history", cascade = CascadeType.REMOVE)
  private Collection<Company> companies = new ArrayList<>();

  @Override
  public String getName() {
    return "History " + id;
  }
}
