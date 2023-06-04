package hu.bme.aut.collectoro.repository

import hu.bme.aut.collectoro.RepositoryTestConfig
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest
import org.springframework.context.annotation.Import

@DataJpaTest
@Import(value = [RepositoryTestConfig::class])
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class UserWithAmountRepositoryTest {
    @Autowired
    private lateinit var userWithAmountRepository: UserWithAmountRepository
}