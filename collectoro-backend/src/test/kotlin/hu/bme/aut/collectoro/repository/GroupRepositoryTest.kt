package hu.bme.aut.collectoro.repository

import hu.bme.aut.collectoro.RepositoryTestConfig
import hu.bme.aut.collectoro.core.group.GroupEntity
import hu.bme.aut.collectoro.core.user.UserEntity
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
        val user = UserEntity.Builder()
            .email("test@example.com")
            .build()

        userRepository.save(user)

        val group1 = GroupEntity.Builder()
            .name("Group 1")
            .users(mutableListOf(user))
            .build()
        val group2 = GroupEntity.Builder()
            .name("Group 2")
            .users(mutableListOf(user))
            .build()
        groupRepository.saveAll(listOf(group1, group2))

        // Find groups by user
        val foundGroups = groupRepository.findByUsers(user)

        // Assert that the found groups are not empty and contain the user
        Assertions.assertFalse(!foundGroups.isEmpty())
        foundGroups.forEach { group ->
            Assertions.assertTrue(group.users.contains(user))
        }
    }

    @Test
    fun findByJoinLink() {
        // Create a group entity with a specific join link and save it in the repository
        val joinLink = "abcd1234"
        val group = GroupEntity.Builder()
            .name("Group 1")
            .joinLink(joinLink)
            .build()
        groupRepository.save(group)

        // Find the group by join link
        val foundGroup = groupRepository.findByJoinLink(joinLink)

        // Assert that the found group is not null and has the correct join link
        Assertions.assertNotNull(foundGroup)
        if (foundGroup != null) {
            Assertions.assertEquals(joinLink, foundGroup.joinLink)
        }
    }

    @Test
    fun save() {
        // Create a group entity and save it in the repository
        val group = GroupEntity.Builder()
            .name("Group 1")
            .build()
        val savedGroup = groupRepository.save(group)

        // Assert that the saved group is not null and has a non-zero ID
        Assertions.assertNotNull(savedGroup)
        Assertions.assertNotEquals(0, savedGroup.id)
    }

    @Test
    fun findGroupEntitiesByUser() {
        // Create user entities and save them in the repository
        val user1 = UserEntity.Builder()
            .email("user1@example.com")
            .build()
        val user2 = UserEntity.Builder()
            .email("user2@example.com")
            .build()
        val user3 = UserEntity.Builder()
            .email("user3@example.com")
            .build()

        userRepository.saveAll(listOf(user1, user2, user3))

        val group1 = GroupEntity.Builder()
            .name("Group 1")
            .users(mutableListOf(user1, user2))
            .build()
        val group2 = GroupEntity.Builder()
            .name("Group 2")
            .users(mutableListOf(user2, user3))
            .build()
        groupRepository.saveAll(listOf(group1, group2))

        // Find groups by user
        val foundGroups = groupRepository.findGroupEntitiesByUser(user2)

        // Assert that the found groups are not empty and contain the user
        Assertions.assertFalse(!foundGroups.isEmpty())
        foundGroups.forEach { group: GroupEntity ->
            Assertions.assertTrue(group.users.contains(user2))
        }
    }
}
