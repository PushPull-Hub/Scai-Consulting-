package com.scaiconsulting.scaichat.DAOImplementations;

import com.scaiconsulting.scaichat.DAOs.FriendShipDAO;
import com.scaiconsulting.scaichat.entities.FriendShip;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
public class FriendShipDAOImplementation implements FriendShipDAO {

    private final EntityManager entityManager;

    @Autowired
    public FriendShipDAOImplementation(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public List<FriendShip> getFriendShipList(int userId) {
        Session currentSession = entityManager.unwrap(Session.class);
        Query<FriendShip> theQuery = currentSession.createQuery("from FriendShip f where f.firstUserId =:userId or secondUserId =:userId", FriendShip.class)
                .setParameter("userId", userId);
        return theQuery.getResultList();
    }


}