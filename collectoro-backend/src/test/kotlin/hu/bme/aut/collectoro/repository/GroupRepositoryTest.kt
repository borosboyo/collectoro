package hu.bme.aut.collectoro.repository

import hu.bme.aut.collectoro.RepositoryTestConfig
import hu.bme.aut.collectoro.core.group.GroupEntity
import hu.bme.aut.collectoro.core.group.GroupRepository
import hu.bme.aut.collectoro.core.user.UserEntity
import hu.bme.aut.collectoro.core.user.UserRepository
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest
import org.springframework.context.annotation.Import

@DataJpaTest
@Import(value = [RepositoryTestConfig::class])
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class GroupRepositoryTest {

    @Autowired
    private lateinit var userRepository: UserRepository

    @Autowired
    private lateinit var groupRepository: GroupRepository

    @Test
    fun findByUsers() {
        // Create a user entity and save it in the repository
        val user = UserEntity(
            email = "asd@asd.com"
        )

        userRepository.save(user)

        val group1 = GroupEntity(
            name = "Group 1",
            users = mutableListOf(user)
        )
        val group2 = GroupEntity(
            name = "Group 2",
            users = mutableListOf(user)
        )
        groupRepository.saveAll(listOf(group1, group2))

        // Find groups by user
        val foundGroups = groupRepository.findByUsers(user)

        // Assert that the found groups are not empty and contain the user
        Assertions.assertTrue(foundGroups.isNotEmpty())
        foundGroups.forEach { group ->
            Assertions.assertTrue(group.users.contains(user))
        }
    }

    @Test
    fun findByJoinLink() {
        // Create a group entity with a specific join link and save it in the repository
        val joinLink = "abcd1234"
        val group = GroupEntity(
            name = "Group 1",
            joinLink = joinLink
        )
        groupRepository.save(group)

        // Find the group by join link
        val foundGroup = groupRepository.findByJoinLink(joinLink).get()

        // Assert that the found group is not null and has the correct join link
        Assertions.assertNotNull(foundGroup)
        if (foundGroup != null) {
            Assertions.assertEquals(joinLink, foundGroup.joinLink)
        }
    }

    @Test
    fun save() {
        // Create a group entity and save it in the repository
        val group = GroupEntity(
            name = "Group 1"
        )
        val savedGroup = groupRepository.save(group)

        // Assert that the saved group is not null and has a non-zero ID
        Assertions.assertNotNull(savedGroup)
        Assertions.assertNotEquals(0, savedGroup.id)
    }

    @Test
    fun findGroupEntitiesByUser() {
        // Create user entities and save them in the repository
        val user1 = UserEntity(
            email = "user1@example.com"
        )
        val user2 = UserEntity(
            email = "user2@example.com"
        )
        val user3 = UserEntity(
            email = "user3@example.com"
        )

        userRepository.saveAll(listOf(user1, user2, user3))

        val group1 = GroupEntity(
            name = "Group 1",
            users = mutableListOf(user1, user2)
        )
        val group2 = GroupEntity(
            name = "Group 2",
            users = mutableListOf(user2, user3)
        )
        groupRepository.saveAll(listOf(group1, group2))

        // Find groups by user
        val foundGroups = groupRepository.findGroupEntitiesByUser(user2)

        // Assert that the found groups are not empty and contain the user
        Assertions.assertTrue(foundGroups.isNotEmpty())
        foundGroups.forEach { group: GroupEntity ->
            Assertions.assertTrue(group.users.contains(user2))
        }
    }
}
